import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";

const axiosClient = axios.create()

axiosClient.interceptors.request.use((config) => {
    const authToken = Cookies.get('auth_token')
    config.headers.Authorization = `Bearer ${authToken}`
    return config
}, (err) => {
    return Promise.reject(err)
})

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || error.message;

      toast.error(`Error: ${status} - ${message}`);

      if (status === 401) {
        const router = useRouter();
        router.push('/sign-in');
      }
    } else if (error.request) {
      toast.error('No response from server. Please try again.');
    } else {
      toast.error(`Request Error: ${error.message}`);
    }

    // Trả về lỗi để xử lý tiếp tục
    return Promise.reject(error);
  }
);


export default axiosClient
