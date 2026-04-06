import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,

      login: async ({email,password}) => {
        const loadingToast = toast.loading("Logging in...");
        try {
          const response = await axiosInstance.post("/auth/login", {
            email,
            password
          });
          const { user, token, refreshToken } = response.data;
          set({ user, token, refreshToken, role: user.role, isAuthenticated: true });
          toast.success(`Welcome, ${user.username}!`,{id:loadingToast});
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Login failed",{id:loadingToast});
        }
      },

      signUp: async ({username,email,password,role}) => {
        const loadingToast = toast.loading("Signing up...");
        try {
          const response = await axiosInstance.post("/auth/register", {
            username,
            email,
            password,
            role: role || "JOB_SEEKER"
          });
          const { user, token, refreshToken } = response.data;
          set({ user, token, refreshToken, role: user.role, isAuthenticated: true });
          toast.success(`Welcome, ${user.username}!`,{id:loadingToast});
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Sign up failed",{id:loadingToast});
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
        } catch (error) {
          console.error("Logout error:", error);
        }
        set({ user: null, token: null, refreshToken: null, role: null, isAuthenticated: false });
        toast.success("Logout successful");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);