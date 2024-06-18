import { getUser } from "@/app/auth";
import responseFormatter from "@/lib/response_formatter";
import { db } from "@/server/db";
import { articles } from "@/server/db/schema";
import googleCloudStorageService from "@/services/google_cloud_storage";
import { eq } from "drizzle-orm";
import { roles } from "drizzle/schema";
import fs from "fs";
import { Readable, pipeline } from "stream";
import { promisify } from "util";
import { nanoid } from "nanoid";
import type { NextRequest } from "next/server";
import path from "path";

function convertReadableStreamToNodeStream(
  readableStream: ReadableStream,
): Readable {
  const reader = readableStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    },
  });
}

export async function GET() {
  const articleLists = await db.select().from(articles);

  return new Response(
    JSON.stringify(
      responseFormatter(
        200,
        "success",
        "success fetching articles",
        articleLists,
      ),
    ),
    {
      status: 200,
    },
  );
}

export async function POST(request: NextRequest) {
  const userCookie = await getUser();

  if (!userCookie) {
    return new Response(
      JSON.stringify(responseFormatter(403, "error", "Unauthorized")),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const userRole = await db
    .select()
    .from(roles)
    .where(eq(roles.id, userCookie?.role_id))
    .limit(1)
    .execute();

  if (userRole.length === 0 || !userRole[0]) {
    return new Response(
      JSON.stringify(responseFormatter(403, "error", "Unauthorized")),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  if (userRole[0].name !== "admin") {
    return new Response(
      JSON.stringify(responseFormatter(403, "error", "Unauthorized")),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image") as File;

  // create temporary path to store image

  if (!title || !description || !image) {
    return new Response(
      JSON.stringify(responseFormatter(400, "error", "Bad request")),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const nodeStream = convertReadableStreamToNodeStream(
    image.stream() as ReadableStream,
  );

  const pump = promisify(pipeline);

  try {
    const filePath = path.join(process.cwd(), "public", "file", image.name);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await pump(nodeStream, fs.createWriteStream(filePath));

    const imageExt = image.name.split(".").pop();
    const imageUrl = await googleCloudStorageService.save(
      "article",
      filePath,
      `article-${nanoid(16)}.${imageExt}`,
    );

    if (imageUrl.error) {
      return new Response(
        JSON.stringify(responseFormatter(500, "error", imageUrl.message)),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Remove the local file after uploading
    fs.unlink(filePath, (err) => {
      if (err) {
        return new Response(
          JSON.stringify(responseFormatter(500, "error", err.message)),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
    });

    const newArticle = await db
      .insert(articles)
      .values({
        title: title.toString(),
        description: description.toString(),
        image_url: imageUrl.data,
        created_by: userCookie.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .returning();

    return new Response(
      JSON.stringify(
        responseFormatter(
          200,
          "success",
          "success creating new article",
          newArticle,
        ),
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    return new Response(
      JSON.stringify(
        responseFormatter(500, "error", "Internal server error", e),
      ),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const userCookie = await getUser();

  if (!userCookie) {
    return new Response(
      JSON.stringify(responseFormatter(403, "error", "Unauthorized")),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const userRole = await db
    .select()
    .from(roles)
    .where(eq(roles.id, userCookie?.role_id))
    .limit(1)
    .execute();

  if (userRole.length === 0 || !userRole[0]) {
    return new Response(
      JSON.stringify(responseFormatter(403, "error", "Unauthorized")),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  if (userRole[0].name !== "admin") {
    return new Response(
      JSON.stringify(responseFormatter(403, "error", "Unauthorized")),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const body = await request.json();

  if (!body.id) {
    return new Response(
      JSON.stringify(responseFormatter(400, "error", "Bad request")),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const articlesData = await db
    .delete(articles)
    .where(eq(articles.id, body.id))
    .returning()
    .execute();

  if (articlesData.length === 0 || !articlesData[0]) {
    return new Response(
      JSON.stringify(responseFormatter(404, "error", "Not found")),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const imageUrl = articlesData[0].image_url.split("/").pop();

  if (!imageUrl) {
    return new Response(
      JSON.stringify(responseFormatter(500, "error", "Internal server error")),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const imageData = await googleCloudStorageService.delete("article", imageUrl);

  if (imageData.error) {
    return new Response(
      JSON.stringify(responseFormatter(500, "error", imageData.message)),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(
    JSON.stringify(responseFormatter(200, "success", "Article deleted")),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
