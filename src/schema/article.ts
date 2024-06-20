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
  image: z.string({
    required_error: "Please select an image",
  }),
});

export const updateArticleSchema = z.object({
  id: z.string({
    required_error: "Article id is required",
  }),
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
    .string({
      required_error: "Please select an image",
    })
    .optional(),
});
