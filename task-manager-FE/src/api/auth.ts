import api from "./axios";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data: {
  username: string;
  email: string;
  description?: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
export const updateUser = async (data: any) => {
  const response = await api.put("/auth/update", data);
  return response.data;
};
