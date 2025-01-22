<template>
  <section>
    <div class="grid grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <h1>
        There are
        <span class="text-purple-500 dark:text-purple-300"
          >{{ vehicles.length }} vehicles
        </span>
      </h1>
      <div class="col-span-3 md:col-span-2 lg:col-span-4">
        <p>Total Vehicles: {{ vehicles.length }}</p>
        <p>Active Vehicle(s): {{ activeVehicles.length }}</p>
        <p>Inactive Vehicles: {{ inactiveVehicles.length }}</p>
      </div>
      <VehicleCard
        v-for="(vehicle, i) in vehicles"
        :key="i"
        :vehicle="vehicle"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import useAxios from "../../composables/useAxios";
import VehicleCard from "../../components/VehicleCard.vue";
import type { Vehicle } from "../../interface/api.interface";

const { getData } = useAxios();
const vehicles = ref<Vehicle[]>([]);

const activeVehicles = computed(() =>
  vehicles.value.filter((vehicle) => vehicle.vehicleStatus === "IN_USE")
);
const inactiveVehicles = computed(() =>
  vehicles.value.filter((vehicle) => vehicle.vehicleStatus == "OUT_OF_SERVICE")
);

onMounted(async () => {
  try {
    vehicles.value = await getData("/vehicles"); // Adjusted endpoint
    console.log("api :", vehicles.value);
  } catch (error) {
    console.error("Failed to fetch api :", error);
  }
});
</script>
