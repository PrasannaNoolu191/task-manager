import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title required").trim(),

    description: z.string().optional(),

    dueDate: z.string(),

    status: z.enum(["Pending", "In Progress", "Completed"]),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),

  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
  }),
});
