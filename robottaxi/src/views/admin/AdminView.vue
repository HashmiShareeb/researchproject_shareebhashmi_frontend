<template>
  <section class="p-4">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Left Column: Stats + Filters + Vehicles (Takes 3/4 of the space) -->
      <div class="lg:col-span-3 space-y-6">
        <!-- 🚀 Vehicle Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="p-4 rounded shadow flex items-center space-x-4"
            :class="stat.bgColor"
          >
            <div :class="stat.iconColor">
              <component :is="stat.icon" class="h-10 w-10" />
            </div>
            <div>
              <p class="text-sm font-medium">{{ stat.label }}</p>
              <p class="text-2xl font-semibold">{{ stat.value }}</p>
            </div>
          </div>
        </div>

        <!-- Filter Dropdown -->
        <label
          for="status-filter"
          class="block text-md font-medium text-gray-700 dark:text-gray-300"
          >Filter by Status</label
        >
        <select
          id="status-filter"
          v-model="selectedStatus"
          class="mt-1 block max-w-md pl-3 pr-10 py-2 text-base bg-neutral-100 dark:bg-neutral-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All</option>
          <option value="IN_USE">Active</option>
          <option value="AVAILABLE">Available</option>
          <option value="MANTAINANCE">In Maintenance</option>
          <option value="OUT_OF_SERVICE">Inactive</option>
        </select>

        <div
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 overflow-x-auto gap-4"
        >
          <template v-if="vehicles.length === 0">
            <div v-for="n in 3" :key="n" class="animate-pulse flex space-x-4">
              <div
                class="rounded bg-neutral-200 dark:bg-neutral-700 h-24 w-full"
              ></div>
            </div>
          </template>
          <VehicleCard
            v-else
            v-for="(vehicle, i) in selectedStatus
              ? vehicles.filter(
                  (vehicle) => vehicle.vehicleStatus === selectedStatus
                )
              : vehicles"
            :key="i"
            :vehicle="vehicle"
          />
        </div>
        <!-- <div class="w-full m-auto hidden md:block">
            <div class="overflow-x-auto whitespace-nowrap">
              <VehicleCard
                v-for="(vehicle, i) in vehicles"
                :key="i"
                :vehicle="vehicle"
                class="inline-block p-2"
              />
            </div>
          </div> -->
      </div>

      <div class="lg:col-span-1">
        <h1 class="text-md mb-2 font-medium text-gray-700 dark:text-gray-300">
          Users in Active Rides
        </h1>
        <aside
          class="rounded-xl p-4 bg-neutral-100 dark:bg-neutral-800 dark:text-white"
        >
          <UserList
            v-if="rides.length > 0"
            v-for="ride in rides"
            :key="ride.rideId"
            :ride="ride"
            class="dark:shadow-none mb-8"
          />
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import useAxios from "../../composables/useAxios";
import VehicleCard from "../../components/VehicleCard.vue";
import type { ActiveRide, Vehicle } from "../../interface/api.interface";

const { getData } = useAxios();
const vehicles = ref<Vehicle[]>([]);

import { VehicleStatus } from "../../interface/api.interface";
import { Car, CarTaxiFrontIcon, Wrench } from "lucide-vue-next";

import UserList from "../../components/users/UserList.vue";

const activeVehicles = computed(() =>
  vehicles.value.filter(
    (vehicle) => vehicle.vehicleStatus === VehicleStatus.IN_USE
  )
);

const underMaintananceVehicles = computed(() =>
  vehicles.value.filter(
    (vehicle) => vehicle.vehicleStatus === VehicleStatus.MANTAINANCE
  )
);

const inactiveVehicles = computed(() =>
  vehicles.value.filter(
    (vehicle) => vehicle.vehicleStatus === VehicleStatus.OUT_OF_SERVICE
  )
);

const stats = computed(() => [
  {
    label: "Total Vehicles",
    value: vehicles.value.length,
    icon: CarTaxiFrontIcon,
    bgColor: "bg-neutral-100 dark:bg-neutral-800",
    iconColor: "text-gray-500 dark:text-gray-400",
  },
  {
    label: "Active Vehicles",
    value: activeVehicles.value.length,
    icon: Car,
    bgColor: "bg-green-100 dark:bg-green-800",
    iconColor: "text-green-500 dark:text-green-400",
  },
  {
    label: "In Maintenance",
    value: underMaintananceVehicles.value.length,
    icon: Wrench,
    bgColor: "bg-red-100 dark:bg-red-800",
    iconColor: "text-red-500 dark:text-red-400",
  },
]);

const selectedStatus = ref<string>("");

onMounted(async () => {
  try {
    vehicles.value = await getData("/vehicles"); // Adjusted endpoint
    console.log("api :", vehicles.value);
  } catch (error) {
    console.error("Failed to fetch api :", error);
  }
});

const rides = ref<ActiveRide[]>([]);

onMounted(async () => {
  try {
    rides.value = await getData("/rides");
    console.log("Rides data:", rides.value);
  } catch (error) {
    console.error("Failed to fetch rides data:", error);
  }
});

watch(selectedStatus, (newStatus) => {
  console.log("Selected status:", newStatus);
});
</script>
