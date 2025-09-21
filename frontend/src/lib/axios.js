import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:process.env.REACT_APP_API_URL, // no need to repeat in store
  withCredentials: true, // if using cookies/JWT with credentials
});
