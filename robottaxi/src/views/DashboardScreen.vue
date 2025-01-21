<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Recipe, Vehicle } from "../interface/api.interface";
import useAxios from "../composables/useAxios";
import VehicleCard from "../components/VehicleCard.vue";

// Define the CORS proxy URL
//const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
import MapView from "../components/Map.vue";

const CORS_ALLOWED_ORIGINS = ["http://localhost:5173"];
const { getData } = useAxios();

// Define the username
const username = ref("User");

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

watch(vehicles, (newVehicles) => {
  console.log("Vehicles:", newVehicles);

  // Check if the vehicles array is empty
  if (newVehicles.length === 0) {
    console.log("No vehicles found");
    return;
  }

  // Check if the vehicles array contains any null values
  if (newVehicles.some((vehicle) => vehicle === null)) {
    console.error("Some vehicles are null");
    return;
  }
});
</script>

<template>
  <section class="px-8 dark:text-white">
    <h1 v-if="vehicles" class="text-2xl font-medium mb-4">
      There are
      <span class="text-purple-500 dark:text-purple-300"
        >{{ vehicles.length }} vehicles </span
      >around your area.
    </h1>
    <div class="flex flex-col gap-4">
      <div class="w-full">
        <MapView
          class="w-full h-64 md:h-auto lg:h-[500px]"
          :markers="
            vehicles.map((vehicle) => ({
              lat: 56.9496,
              lng: 24.1052,
              label: vehicle.vehicleStatus,
            }))
          "
        />
      </div>
      <div class="w-full md:hidden block">
        <div class="grid grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <VehicleCard
            v-for="(vehicle, i) in vehicles"
            :key="i"
            :vehicle="vehicle"
          />
        </div>
      </div>
      <div class="w-full m-auto hidden md:block">
        <div class="overflow-x-auto whitespace-nowrap">
          <VehicleCard
            v-for="(vehicle, i) in vehicles"
            :key="i"
            :vehicle="vehicle"
            class="inline-block p-2"
          />
        </div>
      </div>
    </div>
  </section>
</template>
