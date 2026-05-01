import dayjs from "dayjs";
import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }),
  password: z.string(),
});
export const registerSchema = z
  .object({
    userName: z.string().nonempty({ message: "User Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(12, "Password must be at most 12 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/,
        "Password must contain uppercase, lowercase, number, and special character",
      ),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const taskDetailsSchema = z.object({
  taskTitle: z.string().nonempty({ message: "Task Title is required" }),
  description: z.string().optional(),
  // dueDate: z
  //   .any()
  //   .refine((val) => val === null || dayjs.isDayjs(val), {
  //     message: "Invalid date",
  //   })
  //   .nullable()
  //   .optional(),
  dueDate: z.any().refine((val) => dayjs.isDayjs(val), {
    message: "Due Date is required",
  }),
  status: z.string().nonempty({ message: "Status is required" }),
});
export const editUserSchema = z
  .object({
    userName: z.string().nonempty({ message: "User Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      (!data.currentPassword && !data.newPassword) ||
      (data.currentPassword && data.newPassword),
    {
      message: "Both current and new password are required to change password",
      path: ["currentPassword"], // or ["newPassword"], or both
    },
  );
