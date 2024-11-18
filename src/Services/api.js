
import axios from "axios";
import Cookies from 'js-cookie';



const api = axios.create({
    baseURL: 'http://localhost:4000/api', // Replace with your API base URL
    headers: {
      'Content-Type': 'application/json', // Default content type
    },
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const token = Cookies.get('jwt'); // Retrieve JWT token from cookies
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default api;