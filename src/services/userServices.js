import api from "@/lib/api";

export const loginUser = async (email, password) => {
  const res = await api.post("/api/user/login", { email, password });
  return res.data;
};

export const getUserById = async (userId) => {
  const res = await api.get(`/api/users/${userId}`);
  return res.data;
};

export const createUser = async (data) => {
  const res = await api.post("/api/users", data);
  return res.data;
};

export const updateUser = async (userId, data) => {
  const res = await api.put(`/api/users/${userId}`, data);
  return res.data;
};
