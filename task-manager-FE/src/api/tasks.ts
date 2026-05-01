import api from "./axios";

export const getDashboardStats = async () => {
  const res = await api.get("/tasks/stats/dashboard");
  return res.data;
};
export const getAllTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};
export const createTask = async (data: CreateTaskPayload) => {
  const res = await api.post("/tasks", data);
  return res.data;
};
export const updateTask = async (id: number, data: CreateTaskPayload) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};
export const deleteTask = async (id: number) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
