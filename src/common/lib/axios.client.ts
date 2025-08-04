import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // if (userId) {
      //   config.headers = {
      //     ...config.headers,
      //     id: userId,
      //   };
      // }
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (typeof window !== "undefined") {
      if (error?.response?.status === 401) {
        localStorage.removeItem("sessionID");
        window.location.href = "/";
      }
    }
    return await Promise.reject(error);
  }
);

export default axiosInstance;
