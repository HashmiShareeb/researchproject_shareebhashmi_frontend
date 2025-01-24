<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import Button from "./Button.vue";
// Check the initial dark mode preference
const isDarkMode = ref(localStorage.getItem("theme") === "dark");
const isLoggedIn = ref(false);

// Update the class on the root element and localStorage whenever the mode changes
watch(isDarkMode, (newValue) => {
  const root = document.documentElement;
  if (newValue) {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});
onMounted(() => {
  // Check if the user is logged in and store it
  const storedLoginState = localStorage.getItem("isLoggedIn");
  if (storedLoginState === "true") {
    isLoggedIn.value = true;
  }
});
</script>

<template>
  <header class="flex items-center justify-between dark:text-white p-4">
    <div v-if="isLoggedIn" class="ml-4">
      <h1 v-if="$route.name === 'Home'" class="text-3xl font-bold">
        Welcome to the robotaxi app
      </h1>
    </div>
    <div v-else>
      Please log in to access your dashboard.
      <RouterLink to="/login">Login</RouterLink>
    </div>
    <Button
      :icon="isDarkMode ? SunIcon : MoonIcon"
      @click="isDarkMode = !isDarkMode"
    >
      {{ isDarkMode ? "Light Mode" : "Dark Mode" }}
    </Button>
  </header>
</template>
