import api from "@/lib/api";

export const loginUser = async (email) => {
  const res = await api.post("/auth/login", { email });
  return res.data;
};

export const getUserById = async (userId) => {
  const res = await api.get(`/api/users/${userId}`);
  return res.data;
};

export const getUserByName = async (userName) => {
  const res = await api.get(`/profile/${userName}`);
  return res.data;
};

export const createUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const updateUser = async (userName, data) => {
  const res = await api.put(`/profile/updateProfile/${userName}`, data);
  return res.data;
};
