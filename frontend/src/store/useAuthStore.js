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

      login: async (email,password) => {
        try {
          const response = await axiosInstance.post("/auth/login", {
            email,
            password
          });
          set({ user: response.data.user, isAuthenticated: true });
          toast.success(`Welcome to CMS, ${response.data.user.username}!`);
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Login failed");
        }
      },

      signUp: async (username,email,password) => {
        try {
          const response = await axiosInstance.post("/auth/register", {
            username,
            email,
            password
          });
          set({ user: response.data.user, isAuthenticated: true });
          console.log(response.data);
          toast.success(`Welcome to CMS,! ${response.data.user.username}`);
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Sign up failed");
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
