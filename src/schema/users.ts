import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password is too short (minimum is 8 characters)",
    }),
    newPassword: z.string().min(8, {
      message: "Password is too short (minimum is 8 characters)",
    }),
    newPasswordConfirmation: z.string().min(8, {
      message: "Password is too short (minimum is 8 characters)",
    }),
  })
  .superRefine(({ newPassword, newPasswordConfirmation }, ctx) => {
    if (newPasswordConfirmation !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["newPasswordConfirmation"],
      });
    }
  });
