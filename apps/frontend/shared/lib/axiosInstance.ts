import axios from "axios";

console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export default axiosInstance;
