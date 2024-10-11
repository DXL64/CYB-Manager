import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axiosClient = axios.create()

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = 'Test'
    return config
}, (err) => {
    return Promise.reject(err)
})

// Cấu hình response interceptor để xử lý lỗi
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Kiểm tra và xử lý lỗi
    if (error.response) {
      // Hiển thị lỗi với React Toastify
      toast.error(`Error: ${error.response.status} - ${error.response.data.message || error.message}`);
    } else if (error.request) {
      toast.error("No response from server. Please try again.");
    } else {
      toast.error(`Request Error: ${error.message}`);
    }

    // Trả về lỗi để xử lý tiếp tục
    return Promise.reject(error);
  }
);


export default axiosClient
