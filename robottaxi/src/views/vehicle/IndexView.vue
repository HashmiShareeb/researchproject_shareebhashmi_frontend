<script setup lang="ts">
import { ref } from "vue";
import type { Vehicle } from "../../interface/api.interface";
import VehicleList from "../../components/vehicles/VehicleList.vue";

const vehicles = ref<Vehicle[]>([]);

function editVehicle(id: number) {
  // Implement edit functionality
  console.log(`Edit vehicle with ID: ${id}`);
}

function deleteVehicle(id: number) {
  // Implement delete functionality
  console.log(`Delete vehicle with ID: ${id}`);
}
</script>

<template>
  <VehicleList :vehicles="vehicles" />
</template>
