<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Vehicle } from "../interface/api.interface";
import useAxios from "../composables/useAxios";
import VehicleCard from "../components/VehicleCard.vue";
import type { User } from "../interface/user.interface";
import { VehicleStatus } from "../interface/api.interface";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import Button from "../components/generic/Button.vue";
import MapboxSearch from "../components/MapGeocoder.vue";

// API Utility
const { getData, postData } = useAxios();

// State
const vehicles = ref<Vehicle[]>([]);
const user = ref<User | null>(null);
const router = useRouter();
const authStore = useAuthStore();
const rides = ref<any[]>([]);
const selectedVehicle = ref<Vehicle | null>(null);
const selectedLocation = ref<{
  latitude: number;
  longitude: number;
  address: string;
} | null>(null);

// Fetch Vehicles
onMounted(async () => {
  try {
    vehicles.value = await getData("/vehicles");
    console.log("Vehicles:", vehicles.value);
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
  }
});

// Fetch User Info
onMounted(() => {
  authStore.loadLoginState();
  if (!authStore.isLoggedIn) router.push("/login");

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);

    console.log("User info:", user.value);
  } else {
    router.push("/login");
  }
});

// Fetch Existing Rides
const fetchRides = async () => {
  try {
    const response = await getData("/api/rides");
    rides.value = response;
  } catch (error) {
    console.error("Failed to fetch rides:", error);
  }
};

onMounted(fetchRides);

// Handle Mapbox Search Result
const handleSearchResult = (result: any) => {
  selectedLocation.value = {
    latitude: result.lat,
    longitude: result.lng,
    address: result.place_name,
  };
  console.log("Selected Location:", selectedLocation.value);
};

// Request a Ride
const requestRide = async () => {
  if (!selectedVehicle.value || !selectedLocation.value || !user.value) {
    console.error("Missing data:", {
      selectedVehicle: selectedVehicle.value,
      selectedLocation: selectedLocation.value,
      user: user.value,
    });
    alert("Please select a vehicle, location, and ensure you are logged in.");
    return;
  }

  const requestData = {
    rideName: `Ride to ${selectedLocation.value.address}`,
    rideStatus: "REQUESTED",
    rideDescription: `Ride to ${selectedLocation.value.address}`,
    ridePrice: 25.5,
    location: selectedLocation.value,
    user: {
      userId: user.value.userId, // 🔥 Ensure this is being set
      username: user.value.username,
      email: user.value.email,
    },
  };

  console.log("Sending Ride Request:", requestData);

  try {
    const response = await postData(
      `/rides/request/${user.value.userId}/${selectedVehicle.value.vehicleId}`,
      requestData
    );
    console.log("Ride requested successfully:", response);
    alert("Ride request sent!" + JSON.stringify(response));
  } catch (error) {
    console.error("Error requesting ride:", error);
    alert("Failed to request ride.");
  }
};
</script>

<template>
  <section class="px-8 dark-text-white" v-if="authStore.isLoggedIn">
    <h1 v-if="vehicles.length" class="text-2xl font-medium mb-4">
      There are
      <span class="text-indigo-500 dark-text-indigo-300">
        {{
          vehicles.filter(
            (vehicle) => vehicle.vehicleStatus === VehicleStatus.AVAILABLE
          ).length
        }}
        vehicle(s)
      </span>
      available in your area.
    </h1>

    <h1>Search for a destination:</h1>
    <MapboxSearch
      @search-result="handleSearchResult"
      :markers="
        rides.map((ride) => ({
          lat: ride.location.latitude,
          lng: ride.location.longitude,
        }))
      "
    />

    <div class="w-full my-4">
      <h2 class="text-lg font-semibold">Available Vehicles:</h2>
      <div class="grid grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <VehicleCard
          v-for="(vehicle, i) in vehicles.filter(
            (v) => v.vehicleStatus === VehicleStatus.AVAILABLE
          )"
          :key="i"
          :vehicle="vehicle"
          @click="selectedVehicle = vehicle"
          :class="{
            'border-2 border-indigo-500':
              selectedVehicle?.vehicleId === vehicle.vehicleId,
          }"
        />
      </div>
    </div>

    <Button
      v-if="selectedVehicle && selectedLocation"
      @click="requestRide"
      text="Request Ride"
    />
  </section>

  <section v-else>
    <p>Please log in to access your dashboard.</p>
    <RouterLink to="/login">
      <Button text="Login" />
    </RouterLink>
  </section>
</template>
