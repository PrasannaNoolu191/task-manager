import { Router } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getDashboardStats,
} from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "../validation/tasks.schema";

const router = Router();
router.use(protect);

router.get("/", getAllTasks);
router.post("/", validate(createTaskSchema), createTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

router.get("/stats/dashboard", getDashboardStats);

export default router;
