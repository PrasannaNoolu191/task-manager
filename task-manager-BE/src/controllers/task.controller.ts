import { Response } from "express";
import Counter from "../models/counter";
import Task from "../models/task";
export const getUserTasks = async (userId: string) => {
  return Task.find({ user: userId })
    .sort({ createdAt: -1 })
    .select("id title description dueDate status");
};
const formatDate = (date: Date) => {
  if (!date) return undefined;
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTasks = (tasks: any[]) =>
  tasks.map((task) => ({
    ...task.toObject(),
    dueDate: task.dueDate ? formatDate(task.dueDate) : undefined,
  }));

export const getAllTasks = async (req: any, res: Response) => {
  try {
    const tasks = await getUserTasks(req.userId);
    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: formatTasks(tasks),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch tasks" });
  }
};
export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description, dueDate, status } = req.body;
    if (!title || !dueDate || !status) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    const counter = await Counter.findOneAndUpdate(
      { name: "task" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    await Task.create({
      id: counter.seq,
      title,
      description,
      dueDate,
      status,
      user: req.userId,
    });
    const tasks = await getUserTasks(req.userId);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: formatTasks(tasks),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create task" });
  }
};

export const updateTask = async (req: any, res: Response) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const taskId = req.params.id;

    if (!title || !dueDate || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }

    const task = await Task.findOneAndUpdate(
      { id: taskId, user: req.userId },
      { title, description, dueDate, status },
      { new: true },
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    const tasks = await getUserTasks(req.userId);
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: formatTasks(tasks),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update task" });
  }
};
export const deleteTask = async (req: any, res: Response) => {
  try {
    const taskId = req.params.id;
    await Task.findOneAndDelete({ id: taskId, user: req.userId });
    const tasks = await getUserTasks(req.userId);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: formatTasks(tasks),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete task" });
  }
};
export const getDashboardStats = async (req: any, res: Response) => {
  try {
    const tasks = await getUserTasks(req.userId);

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    res.status(200).json({
      success: true,
      message: "Tasks details fetched successfully",
      stats: {
        totalTasks: total,
        completedTasks: completed,
        pendingTasks: pending,
        inProgressTasks: inProgress,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch task details" });
  }
};
