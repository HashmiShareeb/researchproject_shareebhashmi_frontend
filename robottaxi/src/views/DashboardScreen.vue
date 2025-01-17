<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import Button from "../components/cta/Button.vue";
import type { Recipe, Vehicle } from "../interface/api.interface";
import useAxios from "../composables/useAxios";
import VehicleCard from "../components/VehicleCard.vue";

// Define the CORS proxy URL
//const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
import MapView from "../components/Map.vue";
const CORS_ALLOWED_ORIGINS = ["http://localhost:5173"];
const { getData } = useAxios();

// Define the username
const username = ref("JR JR");

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

const vehicles = ref<Vehicle[]>([]);

onMounted(async () => {
  try {
    vehicles.value = await getData("/vehicles"); // Adjusted endpoint
    console.log("api :", vehicles.value);
  } catch (error) {
    console.error("Failed to fetch api :", error);
  }
});

// const recipes = ref<Recipe | null>(null);

// onMounted(async () => {
//   try {
//     recipes.value = await getData("/recipes"); // Adjusted endpoint
//     console.log("Recipe Data:", recipes.value);
//   } catch (error) {
//     console.error("Failed to fetch recipe data:", error);
//   }
// });
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

    <h1 v-if="vehicles">Recipe Information</h1>
    <!-- <MapView /> -->

    <!-- test api -->
    <div class="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Loop through the first 5 recipes and display RecipeCard for each -->
      <!-- <VehicleCard
        v-for="(recipe, i) in recipes?.slice(0, 5) ?? []"
        :key="i"
        :recipe="recipe"
      /> -->

      <VehicleCard
        v-for="(vehicle, i) in vehicles"
        :key="i"
        :vehicle="vehicle"
      />
    </div>
  </section>
</template>
