<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import Button from "./Button.vue";
// Check the initial dark mode preference
const isDarkMode = ref(localStorage.getItem("theme") === "dark");

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
  const root = document.documentElement;
  if (isDarkMode.value) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
});
</script>

<template>
  <div class="flex items-center justify-end dark:text-white p-4">
    <Button
      :icon="isDarkMode ? SunIcon : MoonIcon"
      @click="isDarkMode = !isDarkMode"
    >
      {{ isDarkMode ? "Light Mode" : "Dark Mode" }}
    </Button>
  </div>
</template>
