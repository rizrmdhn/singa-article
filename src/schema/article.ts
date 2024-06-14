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
    .max(5000, {
      message: "Description is too long (maximum is 2000 characters)",
    }),
  image: z
    .custom<FileList>(
      (fileList) => fileList instanceof FileList,
      "Please select an file",
    )
    .refine((fileList) => fileList.length > 0, "No file selected")
    .refine(
      (fileList) =>
        fileList.length === 1 && fileList[0].type.startsWith("image/"),
      "Please select an image",
    )
    .refine(
      (fileList) => fileList[0].size < 5 * 1024 * 1024,
      "Please select an image smaller than 5MB",
    ),
});

export const updateArticleSchema = z.object({
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
    .max(5000, {
      message: "Description is too long (maximum is 2000 characters)",
    }),
  image: z
    .custom<FileList>(
      (fileList) => fileList instanceof FileList,
      "Please select an file",
    )
    .refine((fileList) => fileList.length > 0, "No file selected")
    .refine(
      (fileList) =>
        fileList.length === 1 && fileList[0].type.startsWith("image/"),
      "Please select an image",
    )
    .refine(
      (fileList) => fileList[0].size < 5 * 1024 * 1024,
      "Please select an image smaller than 5MB",
    )
    .optional(),
});
