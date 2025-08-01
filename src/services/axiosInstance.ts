import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
const axiosInstance : AxiosInstance = axios.create({
  baseURL: `${import.meta.env?.VITE_BASE_API_URL}/api`,
   headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to include token in headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token: string | null = LocalDB?.getVal('token');

    // if (token) {
    //   config.headers = config.headers || new axios.AxiosHeaders();
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      // localStorage.removeItem('user');
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
