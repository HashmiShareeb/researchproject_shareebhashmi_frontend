<script setup lang="ts">
import { ref, onMounted } from "vue";
import useAxios from "../composables/useAxios";
import type { Recipe, Vehicle } from "../interface/api.interface";
import { use } from "motion/react-client";

const { getData } = useAxios();

//entity as prop --> recipe is for testing purposes
// defineProps<{ recipe: Recipe }>();
defineProps<{ vehicle: Vehicle }>();
</script>

<template>
  <div
    class="relative flex flex-col md:flex-row bg-neutral-200 shadow-md dark:bg-neutral-800 rounded-md max-w-sm h-auto p-5"
  >
    <div
      :class="{
        'absolute top-4 right-4 px-2 py-1 rounded text-md': true,
        'bg-green-200 text-green-500': vehicle.vehicleStatus === 'IN_USE',
        'bg-orange-200 text-orange-500':
          vehicle.vehicleStatus === 'out_of_service',
        'bg-red-200 text-red-500': vehicle.vehicleStatus === 'OUT_OF_SERVICE',
      }"
    >
      {{ vehicle.vehicleStatus }}
    </div>
    <div class="flex flex-col align-center justify-around mb-4 md:mb-0 md:mr-4">
      <h1 class="text-3xl font-semibold">
        {{ vehicle.manufacturer }}
        <span
          class="block text-2xl font-normal text-neutral-500 dark:text-neutral-400"
        >
          {{ vehicle.model }}
        </span>
      </h1>
      <h2>
        <span
          class="text-md font-mono text-neutral-500 dark:text-neutral-400"
          >{{ vehicle.licensePlate }}</span
        >
      </h2>
    </div>

    <div class="ml-auto">
      <img
        class="w-32 h-32 object-cover my-10"
        :src="vehicle.vehicleImage || '/src/assets/images/vehicle1.png'"
        :alt="vehicle.manufacturer"
      />
    </div>
  </div>
</template>
