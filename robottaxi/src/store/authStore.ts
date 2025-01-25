import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Role, type User } from "../interface/user.interface"; // Ensure this includes `roles`

export const useAuthStore = defineStore("auth", () => {
  // ✅ Store full user details, including `roles`
  const user = ref<User | null>(null);
  const isLoggedIn = ref(false);
  const router = useRouter();

  // ✅ Load user session from localStorage
  const loadLoginState = () => {
    const storedUser = localStorage.getItem("user");
    const storedLoginState = localStorage.getItem("isLoggedIn");

    if (storedLoginState === "true" && storedUser) {
      user.value = JSON.parse(storedUser) as User;
      isLoggedIn.value = true;
      console.log("Loaded user from localStorage:", user.value);
    } else {
      user.value = null;
      isLoggedIn.value = false;
    }
  };

  // ✅ Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      user.value = data as User; // ✅ Store full user object with `roles`
      isLoggedIn.value = true;

      // ✅ Store session in localStorage
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

    // ✅ Clear session storage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    router.push("/login");
  };

  // ✅ Getter to check if the user is an admin
  const isAdmin = computed(() => user.value?.roles?.includes(Role.ADMIN) ?? false);


  return {
    user,
    isLoggedIn,
    loadLoginState,
    login,
    logout,
    isAdmin,
  };
});