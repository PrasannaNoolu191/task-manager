import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(1, "Username too short").trim(),
    email: z.email("Invalid email").trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(12, "Password must be at most 12 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/,
        "Password must contain uppercase, lowercase, number, and special character",
      ),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
});
export const updateUserSchema = z.object({
  body: z
    .object({
      username: z.string().min(1, "Username too short").trim().optional(),
      email: z.email("Invalid email").trim().optional(),
      currentPassword: z.string().optional(),
      newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(12, "Password must be at most 12 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/,
          "Password must contain uppercase, lowercase, number, and special character",
        )
        .optional()
        .or(z.literal("")),
    })
    .refine(
      (data) =>
        (!data.currentPassword && !data.newPassword) ||
        (data.currentPassword && data.newPassword),
      {
        message:
          "Both currentPassword and newPassword are required to update password",
        path: ["newPassword"],
      },
    ),
});
