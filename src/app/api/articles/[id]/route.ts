import { getUser } from "@/app/auth";
import responseFormatter from "@/lib/response_formatter";
import { db } from "@/server/db";
import { articles } from "@/server/db/schema";
import googleCloudStorageService from "@/services/google_cloud_storage";
import { eq } from "drizzle-orm";
import { roles, users } from "drizzle/schema";
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const articleData = await db
    .select({
      id: articles.id,
      title: articles.title,
      description: articles.description,
      image_url: articles.image_url,
      created_by: articles.created_by,
      created_at: articles.created_at,
      updated_at: articles.updated_at,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
        role_id: users.role_id,
        role: {
          id: roles.id,
          // @ts-ignore
          name: roles.name,
          created_at: roles.created_at,
        },
      },
    })
    .from(articles)
    .leftJoin(users, eq(articles.created_by, users.id))
    .leftJoin(roles, eq(users.role_id, roles.id))
    .where(eq(articles.id, params.id));

  if (articleData.length === 0 || !articleData[0]) {
    return new Response(
      JSON.stringify(responseFormatter(404, "error", "Article not found")),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(
    JSON.stringify(
      responseFormatter(
        200,
        "success",
        "success fetching articles",
        articleData[0],
      ),
    ),
    {
      status: 200,
    },
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
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
  const image = formData.get("image") as File | undefined;

  if (!params.id) {
    return new Response(
      JSON.stringify(responseFormatter(400, "error", "Bad request id missing")),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const oldArticle = await db
    .select()
    .from(articles)
    .where(eq(articles.id, params.id))
    .limit(1)
    .execute();

  if (oldArticle.length === 0 || !oldArticle[0]) {
    return new Response(
      JSON.stringify(responseFormatter(404, "error", "Article not found")),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    let imageUrl: string | undefined;

    if (image) {
      const nodeStream = convertReadableStreamToNodeStream(
        image?.stream() as ReadableStream,
      );

      const pump = promisify(pipeline);

      const filePath = path.join(process.cwd(), "public", "file", image?.name);
      const dir = path.dirname(filePath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await pump(nodeStream, fs.createWriteStream(filePath));

      const imageExt = image?.name.split(".").pop();
      const imageUrlResponse = await googleCloudStorageService.save(
        "article",
        filePath,
        `article-${nanoid(16)}.${imageExt}`,
      );

      if (imageUrlResponse.error) {
        return new Response(
          JSON.stringify(
            responseFormatter(500, "error", imageUrlResponse.message),
          ),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }

      imageUrl = imageUrlResponse.data;

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
    }

    const newArticle = await db
      .update(articles)
      .set({
        title: title?.toString() ?? oldArticle[0].title,
        description: description?.toString() ?? oldArticle[0].description,
        image_url: imageUrl ?? oldArticle[0].image_url,
        created_by: userCookie.id,
        created_at: oldArticle[0].created_at,
        updated_at: new Date().toISOString(),
      })
      .where(eq(articles.id, oldArticle[0].id))
      .returning();

    return new Response(
      JSON.stringify(
        responseFormatter(
          200,
          "success",
          "Article updated successfully",
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
