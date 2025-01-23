<template>
  <nav aria-label="breadcrumb" class="mb-4 mx-4">
    <ol class="flex space-x-2 text-sm text-gray-400">
      <li>
        <a
          href="/admin/vehicles"
          class="dark:text-purple-400 text-purple-500 hover:underline"
          >Vehicle List</a
        >
      </li>
      <li class="before:content-['/'] before:mx-2">
        <span class="text-gray-400"
          >Edit {{ vehicle.manufacturer }} {{ vehicle.model }}</span
        >
      </li>
    </ol>
  </nav>
  <form
    class="max-w-md mx-auto"
    aria-labelledby="vehicle-edit-form"
    @submit.prevent="saveVehicle"
  >
    <h1 id="vehicle-edit-form" class="sr-only">Edit Vehicle</h1>
    <!-- <div class="mb-4">
            <label for="vehicleId" class="block">Vehicle ID</label>
            <input
                type="text"
                class="w-full px-3 py-2 border dark:bg-neutral-800 border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                id="vehicleId"
                placeholder="Enter vehicle ID"
                v-model="vehicleId"
                aria-required="true"
            />
        </div> -->
    <div class="mb-4">
      <label for="manufacturer" class="block">Manufacturer</label>
      <input
        type="text"
        class="w-full px-3 py-2 border dark:bg-neutral-800 border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        id="manufacturer"
        placeholder="Enter manufacturer"
        v-model="vehicle.manufacturer"
        aria-required="true"
      />
    </div>
    <div class="mb-4">
      <label for="model" class="block">Model</label>
      <input
        type="text"
        class="w-full px-3 py-2 border dark:bg-neutral-800 border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        id="model"
        placeholder="Enter model"
        v-model="vehicle.model"
        aria-required="true"
      />
    </div>
    <div class="mb-4">
      <label for="licensePlate" class="block">License Plate</label>
      <input
        type="text"
        class="w-full px-3 py-2 border dark:bg-neutral-800 border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        id="licensePlate"
        placeholder="Enter license plate"
        v-model="vehicle.licensePlate"
        aria-required="true"
      />
    </div>
    <div class="mb-4">
      <label for="year" class="block">Year</label>
      <input
        type="number"
        class="w-full px-3 py-2 border dark:bg-neutral-800 border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        id="year"
        placeholder="Enter year"
        v-model="vehicle.year"
        aria-required="true"
      />
    </div>
    <div class="mb-4">
      <label for="batteryLevel" class="block">Battery Level (%)</label>
      <input
        type="number"
        class="w-full px-3 py-2 border dark:bg-neutral-800 border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        id="batteryLevel"
        placeholder="Enter battery level (%)"
        v-model="vehicle.batteryLevel"
        aria-required="true"
        min="0"
        max="100"
      />
    </div>
    <div class="mb-4">
      <label for="vehicleStatus" class="block">Vehicle Status</label>
      <select
        class="w-full px-3 py-2 border dark:bg-neutral-800 border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        id="vehicleStatus"
        v-model="vehicle.vehicleStatus"
        aria-required="true"
      >
        <option value="IN_USE">In Use</option>
        <option value="AVAILABLE">Available</option>
        <option value="MANTAINANCE">Maintenance</option>
        <option value="OUT_OF_SERVICE">Out of Service</option>
      </select>
    </div>
  </form>
  <div class="mt-6">
    <Button
      type="submit"
      class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      @click="saveVehicle"
      :text="isEdit ? 'Update' : 'Save'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Button from "../../components/generic/Button.vue";
import useAxios from "../../composables/useAxios";
import { useRoute, useRouter } from "vue-router";

const { getData, postData, putData } = useAxios();
const route = useRoute();
const router = useRouter();

const vehicle = ref({
  manufacturer: "",
  model: "",
  licensePlate: "",
  year: 2023,
  batteryLevel: 100,
  vehicleStatus: "AVAILABLE",
});

const isEdit = computed(() => !!route.params.id);

onMounted(async () => {
  if (isEdit.value) {
    vehicle.value = await getData(`/vehicles/${route.params.id}`);
  }
});

const saveVehicle = async () => {
  if (isEdit.value) {
    await putData(`/vehicles/${route.params.id}`, vehicle.value);
  } else {
    await postData("/vehicles", vehicle.value);
  }
  router.push("/admin/vehicles");
};
</script>
