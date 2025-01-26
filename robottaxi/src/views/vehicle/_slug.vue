<template>
  <div class="dark:text-white p-6 min-h-screen">
    <div
      v-if="ride"
      class="dark:bg-neutral-700 bg-neutral-100 p-4 rounded-lg shadow-lg"
    >
      <h2 class="text-2xl font-semibold mb-4">Active Ride</h2>
      <p class="mb-2">
        <span class="font-bold">Coordinates:</span>
        {{ ride.location.latitude }}, {{ ride.location.longitude }}
      </p>
      <p class="mb-2">
        <span class="font-bold">Address:</span> {{ ride.location.address }}
      </p>
      <p class="mb-2">
        <span class="font-bold">Ride Name:</span> {{ ride.rideName }}
      </p>
      <p class="mb-2">
        <span class="font-bold">Description:</span> {{ ride.rideDescription }}
      </p>
      <p class="mb-2">
        <span class="font-bold">Price:</span> ${{ ride.ridePrice }}
      </p>
    </div>

    <div
      v-if="ride && ride.vehicle"
      class="dark:bg-neutral-700 bg-neutral-100 p-4 rounded-lg shadow-lg mt-6"
    >
      <h2 class="text-2xl font-semibold mb-4">Vehicle Information</h2>
      <p class="mb-2">
        <span class="font-bold">Manufacturer:</span>
        {{ ride.vehicle.manufacturer }}
      </p>
      <p class="mb-2">
        <span class="font-bold">Model:</span> {{ ride.vehicle.model }}
      </p>
      <p class="mb-2">
        <span class="font-bold">License Plate:</span>
        {{ ride.vehicle.licensePlate }}
      </p>
      <p class="mb-2">
        <span class="font-bold">Battery Level:</span>
        {{ ride.vehicle.batteryLevel }}%
      </p>
    </div>
    <Button
      @click="$router.go(-1)"
      text="Back"
      aria-label="Go back to the previous page"
      class="my-4"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Button from "../../components/generic/Button.vue";

// Get route parameters
const route = useRoute();

// Initialize the ride object
const ride = ref(null);

// Fetch ride data on component mount
onMounted(async () => {
  try {
    const rideId = route.params.id;
    // Replace the following line with an actual API call to fetch the ride
    // Example: const response = await axios.get(`/api/rides/${rideId}`);

    // Assuming you have ride data available in the response
    ride.value = {
      rideName: "City Center to Airport",
      rideDescription: "Late night ride to the airport",
      ridePrice: 56.2,
      location: {
        latitude: 50.850346,
        longitude: 4.351721,
        address: "Belgium, Brussels",
      },
      vehicle: {
        manufacturer: "Tesla",
        model: "CyberCab",
        licensePlate: "KLMPP-45",
        batteryLevel: 100,
      },
      user: {
        username: "randomuser1",
        email: "randomuser1@example.com",
        roles: ["USER"],
      },
    };
  } catch (error) {
    console.error("Error fetching ride data:", error);
  }
});
</script>
