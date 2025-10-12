import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { em } from "@mantine/core";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async ({email,password}) => {
        const loadingToast = toast.loading("Logging in...");
        try {
          const response = await axiosInstance.post("/auth/login", {
            email,
            password
          });
          set({ user: response.data.user, isAuthenticated: true });
          toast.success(`Welcome to CMS, ${response.data.user.username}!`,{id:loadingToast});
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Login failed",{id:loadingToast});
        }
      },

      signUp: async ({username,email,password}) => {
        const loadingToast = toast.loading("Signing up...");
        try {
          const response = await axiosInstance.post("/auth/register", {
            username,
            email,
            password
          });
          set({ user: response.data.user, isAuthenticated: true });
          console.log(response.data);
          toast.success(`Welcome to CMS,! ${response.data.user.username}`,{id:loadingToast});
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Sign up failed",{id:loadingToast});
        }
      },

      logout: () => {
        try {
          set({ user: null, isAuthenticated: false });
          toast.success("Logout successful");
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Logout failed");
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
