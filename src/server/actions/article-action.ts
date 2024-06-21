"use server";

import { getUser } from "@/app/auth";
import responseFormatter from "@/lib/response_formatter";
import fs from "fs";
import { db } from "@/server/db";
import { articles } from "@/server/db/schema";
import path from "path";
import googleCloudStorageService from "@/services/google_cloud_storage";
import { nanoid } from "nanoid";
import { fetchArticleById, fetchArticles, fetchUserRole } from "../queries";
import { actionClient } from "@/lib/safe-action";
import { createArticleSchema, updateArticleSchema } from "@/schema/article";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

interface SaveBase64ImageOptions {
  base64String: string;
  filePath: string;
}

async function saveBase64Image({
  base64String,
  filePath,
}: SaveBase64ImageOptions): Promise<{
  fileName: string;
  filePath: string;
  fileExtension: string | undefined;
}> {
  const matches = base64String.match(
    /^data:image\/([A-Za-z-+/]+);base64,(.+)$/,
  );

  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  const imageType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data!, "base64");

  const filePathWithExtension = `${filePath}.${imageType}`;

  return new Promise((resolve, reject) => {
    fs.writeFile(filePathWithExtension, buffer, (err) => {
      if (err) {
        return reject(err);
      }

      resolve({
        fileName: path.basename(filePathWithExtension),
        filePath: filePathWithExtension,
        fileExtension: imageType,
      });
    });
  });
}

export const articleList = async () => {
  const articleLists = await fetchArticles();

  return articleLists;
};

export const createArticle = actionClient
  .schema(createArticleSchema)
  .action(async ({ parsedInput: { title, description, image } }) => {
    const userCookie = await getUser();

    if (!userCookie) {
      return responseFormatter(401, "error", "Unauthorized");
    }

    const userRole = await fetchUserRole(userCookie.id);

    if (!userRole) {
      return responseFormatter(
        401,
        "error",
        "Unauthorized user does not exist have a role",
      );
    }

    if (userRole.role?.name !== "admin") {
      return responseFormatter(401, "error", "Unauthorized user is not admin");
    }

    if (!title || !description || !image) {
      return responseFormatter(
        400,
        "error",
        "Title, description, and image are required",
      );
    }

    const imageName = `article-${nanoid(16)}`;
    const filePath = path.join(process.cwd(), "public", "uploads", imageName);

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      // Save the base64 image locally and get the full file path with extension
      const filePathWithExtension = await saveBase64Image({
        base64String: image,
        filePath,
      });
      const imageUrl = await googleCloudStorageService.save(
        "article",
        filePathWithExtension.filePath,
        filePathWithExtension.fileName,
      );

      if (imageUrl.error) {
        return responseFormatter(500, "error", imageUrl.message);
      }

      // Remove the local file after uploading
      fs.unlink(filePathWithExtension.filePath, (err) => {
        if (err) {
          throw err;
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

      revalidatePath("/dashboard/articles");
      revalidatePath("/dashboard/articles/new");

      await googleCloudStorageService.refreshStorage();
      return responseFormatter(200, "success", "Article created", newArticle);
    } catch (e) {
      return responseFormatter(500, "error", JSON.stringify(e));
    }
  });

export const updateArticle = actionClient
  .schema(updateArticleSchema)
  .action(async ({ parsedInput: { id, title, description, image } }) => {
    const userCookie = await getUser();

    if (!userCookie) {
      return responseFormatter(401, "error", "Unauthorized");
    }

    const userRole = await fetchUserRole(userCookie.id);

    if (!userRole) {
      return responseFormatter(
        401,
        "error",
        "Unauthorized user does not exist have a role",
      );
    }

    if (userRole.role?.name !== "admin") {
      return responseFormatter(401, "error", "Unauthorized user is not admin");
    }

    if (!id) {
      return responseFormatter(400, "error", "Article id is required");
    }

    const oldArticle = await fetchArticleById(Number(id));

    if (!oldArticle) {
      return responseFormatter(404, "error", "Article not found");
    }

    try {
      let imageUrlFromStorage: string | undefined = undefined;

      if (image) {
        const imageName = `article-${nanoid(16)}`;
        const filePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          imageName,
        );

        const dir = path.dirname(filePath);

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        const filePathWithExtension = await saveBase64Image({
          base64String: image,
          filePath,
        });

        const imageUrl = await googleCloudStorageService.save(
          "article",
          filePathWithExtension.filePath,
          filePathWithExtension.fileName,
        );

        if (imageUrl.error) {
          return responseFormatter(500, "error", imageUrl.message);
        }

        imageUrlFromStorage = imageUrl.data;

        // Remove the local file after uploading
        fs.unlink(filePathWithExtension.filePath, (err) => {
          if (err) {
            throw err;
          }
        });
      }

      const newArticle = await db
        .update(articles)
        .set({
          title: title?.toString() ?? oldArticle.title,
          description: description?.toString() ?? oldArticle.description,
          image_url: imageUrlFromStorage ?? oldArticle.image_url,
          created_by: userCookie.id,
          created_at: oldArticle.created_at,
          updated_at: new Date().toISOString(),
        })
        .where(eq(articles.id, oldArticle.id))
        .returning();

      revalidatePath(`/dashboard/articles/${id}`);
      revalidatePath(`/dashboard/articles/${id}/edit`);

      return responseFormatter(200, "success", "Article updated", newArticle);
    } catch (error) {
      return responseFormatter(500, "error", JSON.stringify(error));
    }
  });

export const deleteArticle = async (id: number): Promise<any> => {
  if (!id) {
    return responseFormatter(400, "error", "Article id is required");
  }

  const userCookie = await getUser();

  if (!userCookie) {
    return responseFormatter(401, "error", "Unauthorized");
  }

  const userRole = await fetchUserRole(userCookie.id);

  if (!userRole) {
    return responseFormatter(
      401,
      "error",
      "Unauthorized user does not exist have a role",
    );
  }

  if (userRole.role?.name !== "admin") {
    return responseFormatter(401, "error", "Unauthorized user is not admin");
  }

  const article = await fetchArticleById(id);

  if (!article) {
    return responseFormatter(404, "error", "Article not found");
  }

  try {
    await db.delete(articles).where(eq(articles.id, id)).returning();

    const imageData = await googleCloudStorageService.delete(
      "article",
      article.image_url.split("/").pop()!,
    );

    if (imageData.error) {
      return responseFormatter(500, "error", imageData.message);
    }

    revalidatePath("/dashboard/articles");

    return responseFormatter(200, "success", "Article deleted");
  } catch (error) {
    return responseFormatter(500, "error", JSON.stringify(error));
  }
};

export const getArticleDetail = async (id: number): Promise<any> => {
  if (!id) {
    return responseFormatter(400, "error", "Article id is required");
  }

  const article = await fetchArticleById(id);

  if (!article) {
    return responseFormatter(404, "error", "Article not found");
  }

  return article;
};
