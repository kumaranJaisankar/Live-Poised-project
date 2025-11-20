import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const fastApiInterceptor = axios.create({
  baseURL: process.env.NEXT_FAST_API_BASE_URL || "http://localhost:8000",
  withCredentials: true,
});

fastApiInterceptor.interceptors.request.use((config) => {
  ///as of now no need access token for this api
  //   const auth = useAuth();
  //   //   const token = auth.getToken();
  //   //   console.log("API Interceptor Token:", token);
  //   if (config.url && config.url.includes("/auth/register")) {
  //     return config;
  //   }
  //   const token = localStorage.getItem("access_token");
  //   if (token) config.headers.Authorization = `Bearer ${token}`;
  //   //   const token = localStorage.getItem("token");
  //   //  config.headers.Authorization = `Bearer SNxKHkIHc1BfluPnAIY/3WNK2SbrpN6T3R/31hAG0WOs=`;
  return config;
});

export default fastApiInterceptor;
