<script setup lang="ts">
import { ref, watch } from "vue";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import Button from "../components/cta/Button.vue";
//import MapView from "../components/Map.vue";

// Define the username
const username = ref("John Doe");

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

// Ensure the correct initial state on load
if (isDarkMode.value) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
</script>

<template>
  <section class="px-8 dark:text-white">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl">Welcome, {{ username }}</h1>
      <Button
        :icon="isDarkMode ? SunIcon : MoonIcon"
        @click="isDarkMode = !isDarkMode"
      >
        {{ isDarkMode ? "Light Mode" : "Dark Mode" }}
      </Button>
    </div>
    <p class="mt-4 text-lg">This is a transition example using motion.</p>

    <!-- <MapView /> -->
    <!-- <VehicleCard /> -->
  </section>
</template>
