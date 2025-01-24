import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false);

  // Load login state from localStorage
  const loadLoginState = () => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  };

  return {
    isLoggedIn,
    loadLoginState,
  };
});
