<script setup lang="ts">
import { ref, onMounted } from "vue";
import useAxios from "../composables/useAxios";
import type { Recipe, Vehicle } from "../interface/api.interface";
import { use } from "motion/react-client";
import Button from "./generic/Button.vue";
import {
  LucideBatteryFull,
  MoonIcon,
  SunIcon,
  LucideBatteryLow,
  LucideBatteryMedium,
  LucideBatteryCharging,
} from "lucide-vue-next";

const { getData } = useAxios();

//entity as prop --> recipe is for testing purposes
// defineProps<{ recipe: Recipe }>();
defineProps<{ vehicle: Vehicle }>();
</script>

<!-- <template>
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
</template> -->
<template>
  <div>
    <div
      class="!z-5 relative flex flex-col rounded-xl max-w-[300px] dark:bg-neutral-800 bg-neutral-100 shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px]"
    >
      <div class="h-full w-full">
        <div class="relative object-cover w-auto">
          <img
            src="/src/assets/images/vehicle1.png"
            class="w-64 h-56 object-cover"
            alt="vehicle e"
          />

          <div
            :class="{
              'text-sm uppercase absolute top-0 right-0 flex items-center justify-center rounded-full p-2 hover:cursor-pointer': true,
              'bg-green-200 text-green-500': vehicle.vehicleStatus === 'IN_USE',
              'bg-orange-200 text-orange-500':
                vehicle.vehicleStatus === 'out_of_service',
              'bg-red-200 text-red-500':
                vehicle.vehicleStatus === 'OUT_OF_SERVICE',
            }"
          >
            {{ vehicle.vehicleStatus }}
          </div>
          <div
            :class="{
              'text-green-400': vehicle.batteryLevel > 50,
              'text-orange-400':
                vehicle.batteryLevel <= 50 && vehicle.batteryLevel > 20,
              'text-red-400': vehicle.batteryLevel <= 20,
              'text-gray-400': vehicle.batteryLevel === null,
            }"
            class="font-medium uppercase absolute top-0 left-0 flex items-center justify-center rounded-full p-2"
          >
            <component
              :is="
                vehicle.batteryLevel > 50
                  ? LucideBatteryFull
                  : vehicle.batteryLevel <= 50 && vehicle.batteryLevel > 20
                  ? LucideBatteryMedium
                  : vehicle.batteryLevel <= 20
                  ? LucideBatteryLow
                  : LucideBatteryCharging
              "
              class="w-5 h-5 mr-2"
            />
            {{
              vehicle.batteryLevel !== null ? vehicle.batteryLevel + "%" : ""
            }}
          </div>
        </div>
        <div class="mb-3 flex items-center justify-between px-1 md:items-start">
          <div class="mb-2">
            <p class="text-xl font-bold">
              {{ vehicle.manufacturer }} {{ vehicle.model }}
            </p>
            <p
              class="text-md font-medium dark:text-purple-300 text-purple-400 md:mt-2"
            >
              {{ vehicle.licensePlate }}
            </p>
          </div>
        </div>
        <div
          class="flex items-center justify-between md:items-center lg:justify-between"
        >
          <div class="flex">
            <p class="!mb-0 text-sm uppercase text-neutral-400">
              prod year: {{ vehicle.year }}
            </p>
          </div>
        </div>
        <Button class="ml-auto mt-2" href="" text="View Details" />
      </div>
    </div>
  </div>
</template>
