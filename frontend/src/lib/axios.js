import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://job-portal-nfey.onrender.com/api", // no need to repeat in store
  withCredentials: true, // if using cookies/JWT with credentials
});
