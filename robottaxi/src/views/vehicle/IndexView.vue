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
  <!-- <div class="mx-auto p-4 rounded-lg bg-white shadow-md dark:bg-neutral-800">
    <h1 class="text-2xl font-bold mb-4 dark:text-white">Vehicle List</h1>
    <table class="min-w-full dark:text-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">Name</th>
          <th class="py-2 px-4 border-b">Model</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="py-2 px-4 border-b">1</td>
          <td class="py-2 px-4 border-b">Vehicle 1</td>
          <td class="py-2 px-4 border-b">Model 1</td>
          <td class="py-2 px-4 border-b">
            <button
              class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              @click="editVehicle(1)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded"
              @click="deleteVehicle(1)"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">2</td>
          <td class="py-2 px-4 border-b">Vehicle 2</td>
          <td class="py-2 px-4 border-b">Model 2</td>
          <td class="py-2 px-4 border-b">
            <button
              class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              @click="editVehicle(2)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded"
              @click="deleteVehicle(2)"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">3</td>
          <td class="py-2 px-4 border-b">Vehicle 3</td>
          <td class="py-2 px-4 border-b">Model 3</td>
          <td class="py-2 px-4 border-b">
            <button
              class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              @click="editVehicle(3)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded"
              @click="deleteVehicle(3)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div> -->
</template>
