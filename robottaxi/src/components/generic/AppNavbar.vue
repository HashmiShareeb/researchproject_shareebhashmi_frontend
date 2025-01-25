<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import Button from "./Button.vue";

const isDarkMode = ref(false);
// User authentication state
const isLoggedIn = ref(false);

const username = ref("");

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
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove("dark");
  }

  //pinia login hier
  const storedLoginState = localStorage.getItem("isLoggedIn");
  if (storedLoginState === "true") {
    isLoggedIn.value = true;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        username.value = user.username ?? "Guest";
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }
});
</script>

<template>
  <header class="flex items-center justify-between dark:text-white p-4">
    <div v-if="isLoggedIn" class="ml-4">
      <h1 v-if="$route.name === 'Home'" class="text-3xl font-bold">
        Welcome
        <span class="text-indigo-500 dark:text-indigo-400">{{ username }}</span>
      </h1>
      <h1 v-else class="text-3xl font-bold">
        {{ $route.name }}
      </h1>
    </div>
    <div v-else>
      <h1 class="text-3xl font-bold">
        {{ $route.name }}
      </h1>
    </div>
    <Button
      :icon="isDarkMode ? SunIcon : MoonIcon"
      @click="isDarkMode = !isDarkMode"
    >
      {{ isDarkMode ? "Light Mode" : "Dark Mode" }}
    </Button>
  </header>
</template>
