import { ref } from "vue";
import useAxios from "./useAxios";

import type { User } from "../interface/user.interface";

const useAuth = () => {
  const { postData } = useAxios();
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);

  const register = async (
    username: string,
    email: string,
    password: string,
    roles: string[]
  ) => {
    error.value = null;
    try {
      const response = await postData("/auth/register", {
        username,
        email,
        password,
        roles,
      });

      if (response) {
        localStorage.setItem("user", JSON.stringify(response)); // ✅ Store user properly
      }
      return response; // Registration successful
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Registration failed. " + err.message;
      console.error("Registration error:", err.response?.data || err.message);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await postData("/auth/login", { username, password });

      if (response) {
        localStorage.setItem("user", JSON.stringify(response)); // ✅ Store user properly
      }
      return response;
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
  };

  return { user, error, register, login, logout };
};

export default useAuth;
