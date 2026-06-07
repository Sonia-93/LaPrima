import axios from 'axios';

// Create an Axios instance
// We rely on the proxy setting in package.json passing /api to localhost:5000 in development.
const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to automatically add the JWT token to headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: you can add a response interceptor to handle 401s (token expired etc)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If we receive a 401 Unauthorized, we might want to log the user out
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // A full app redirection might be needed, but for now we just reject
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
