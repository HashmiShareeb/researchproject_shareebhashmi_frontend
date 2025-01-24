import { ref } from "vue";
import useAxios from "./useAxios";

const useAuth = () => {
  const { postData } = useAxios();
  const user = ref(null);
  const error = ref<string | null>(null);

  const register = async (
    username: string,
    password: string,
    email: string,
    roles: string[]
  ) => {
    error.value = null;
    try {
      const response = await postData("/api/auth/register", {
        username,
        password,
        email,
        roles,
      });
      return response; // Registration successful
    } catch (err: any) {
      error.value = err.response?.data?.message || "Registration failed.";
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await postData("/auth/login", { username, password });
      localStorage.setItem("user", JSON.stringify(response));
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
