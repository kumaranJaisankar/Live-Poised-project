import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const api = axios.create({
  baseURL: "https://localhost:8000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const auth = useAuth();
  //   const token = auth.getToken();
  //   console.log("API Interceptor Token:", token);
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  //   const token = localStorage.getItem("token");
  //  config.headers.Authorization = `Bearer SNxKHkIHc1BfluPnAIY/3WNK2SbrpN6T3R/31hAG0WOs=`;
  return config;
});

export default api;
