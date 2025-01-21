<script setup lang="ts">
import type { Recipe, Vehicle } from "../interface/api.interface";
import Button from "./generic/Button.vue";
import {
  LucideBatteryFull,
  LucideBatteryLow,
  LucideBatteryMedium,
  LucideBatteryCharging,
} from "lucide-vue-next";

import { useRouter } from "vue-router";

const router = useRouter();

//entity as prop --> recipe is for testing purposes
// defineProps<{ recipe: Recipe }>();
defineProps<{ vehicle: Vehicle }>();
const viewDetails = (vehicleId: string) => {
  alert(`Viewing details for vehicle ID: ${vehicleId}`);
};
</script>
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
        <Button
          class="ml-auto mt-2"
          @click="
            router.push({
              name: 'VehicleDetail',
              params: { id: vehicle.vehicleId },
            })
          "
          text="View Details"
        />
      </div>
    </div>
  </div>
</template>
