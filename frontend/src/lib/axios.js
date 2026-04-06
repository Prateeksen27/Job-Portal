import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("auth-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      const token = parsed.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if ((error.response?.status === 401 || (error.response?.status === 403 && error.response?.data?.code === 'TOKEN_EXPIRED')) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      let parsed = null;
      
      try {
        const stored = localStorage.getItem("auth-storage");
        if (!stored) {
          throw new Error("No refresh token available");
        }
        
        parsed = JSON.parse(stored);
        const refreshToken = parsed.state?.refreshToken;
        
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );
        
        const { token, refreshToken: newRefreshToken } = response.data;
        
        parsed.state.token = token;
        if (newRefreshToken) {
          parsed.state.refreshToken = newRefreshToken;
        }
        localStorage.setItem("auth-storage", JSON.stringify(parsed));
        
        processQueue(null, token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        const authStore = parsed?.state;
        if (authStore) {
          localStorage.removeItem("auth-storage");
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);