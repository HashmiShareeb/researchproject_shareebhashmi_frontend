import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<{ username: string; email: string } | null>(null);
  const isLoggedIn = ref(false);
  const router = useRouter();

  // ✅ Load user session from localStorage
  const loadLoginState = () => {
    const storedUser = localStorage.getItem("user");
    const storedLoginState = localStorage.getItem("isLoggedIn");

    if (storedLoginState === "true" && storedUser) {
      user.value = JSON.parse(storedUser);
      isLoggedIn.value = true;
    } else {
      user.value = null;
      isLoggedIn.value = false;
    }
  };

  // ✅ Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      user.value = { username: data.username, email: data.email };
      isLoggedIn.value = true;

      // Store session in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user.value));

      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // ✅ Logout function
  const logout = () => {
    user.value = null;
    isLoggedIn.value = false;

    // Clear session storage 
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return {
    user,
    isLoggedIn,
    loadLoginState,
    login,
    logout,
  };
});
