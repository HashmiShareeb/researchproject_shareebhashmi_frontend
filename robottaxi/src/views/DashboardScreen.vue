<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Recipe, Vehicle } from "../interface/api.interface";
import useAxios from "../composables/useAxios";
import VehicleCard from "../components/VehicleCard.vue";
import type { User } from "../interface/user.interface";

// Define the CORS proxy URL
//const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
import MapView from "../components/Map.vue";

const CORS_ALLOWED_ORIGINS = ["http://localhost:5173"];
const { getData } = useAxios();

// Define the username
const username = ref("User");

const vehicles = ref<Vehicle[]>([]);

const user = ref<User | null>(null);

import { VehicleStatus } from "../interface/api.interface";

// const fetchedUser = async () => {
//   try {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       user.value = JSON.parse(storedUser);
//     } else {
//       user.value = await getData("/api/auth/user"); // Adjust if needed
//       localStorage.setItem("user", JSON.stringify(user.value));
//     }
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//   }
// };

onMounted(async () => {
  try {
    vehicles.value = await getData("/vehicles"); // Adjusted endpoint
    console.log("api :", vehicles.value);
  } catch (error) {
    console.error("Failed to fetch api :", error);
  }
});

// Define the reactive value to track if the user is logged in
const isLoggedIn = ref(false);

const storedLoginState = localStorage.getItem("isLoggedIn");
if (storedLoginState === "true") {
  isLoggedIn.value = true;
}

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
  <section class="px-8 dark:text-white" v-if="isLoggedIn">
    Hello, {{ user?.username ?? "Guest" }}!
    <div v-if="user">
      <p>Email: {{ user.email }}</p>
      <p>username: {{ user.username }}</p>
      <!-- Add more user session information here as needed -->
    </div>
    <h1 v-if="vehicles" class="text-2xl font-medium mb-4">
      There are
      <span class="text-purple-500 dark:text-purple-300"
        >{{
          vehicles.filter(
            (vehicle) => vehicle.vehicleStatus === VehicleStatus.AVAILABLE
          ).length
        }}
        vehicle(s) </span
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
        <h1>Available Vehicles</h1>
        <div class="overflow-x-auto whitespace-nowrap">
          <VehicleCard
            v-for="(vehicle, i) in vehicles.filter(
              (vehicle) => vehicle.vehicleStatus === VehicleStatus.AVAILABLE
            )"
            :key="i"
            :vehicle="vehicle"
            class="inline-block p-2"
          />
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <p>Please log in to access your dashboard.</p>
    <RouterLink to="/login">Login</RouterLink>
  </section>
</template>
