import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title is too short (minimum is 3 characters)",
    })
    .max(100, {
      message: "Title is too long (maximum is 100 characters)",
    }),
  description: z
    .string()
    .min(3, {
      message: "Description is too short (minimum is 3 characters)",
    })
    .max(2000, {
      message: "Description is too long (maximum is 2000 characters)",
    }),
  image: z
    .custom<FileList>(
      (fileList) => fileList instanceof FileList,
      "File must be an instance of FileList",
    )
    .refine((fileList) => fileList.length > 0, "File must be selected")
    .refine((fileList) => fileList.length < 2, "File must be less than 2")
    .refine(
      (fileList) => fileList[0].type === "image/jpeg" || "image/png",
      "File must be an image",
    )
    .refine(
      (fileList) => fileList[0].size < 2 * 1024 * 1024,
      "File must be less than 2MB",
    ),
});
