<template>
  <section class="dark:text-white">
    <!-- Table Wrapper -->
    <div
      class="overflow-x-auto rounded-md dark:bg-neutral-800 bg-white p-0 shadow-md"
    >
      <table class="min-w-full border-collapse">
        <thead>
          <tr
            class="bg-gray-100 dark:bg-neutral-700 text-left w-full text-gray-600 dark:text-gray-300"
          >
            <th class="p-3">VehicleId</th>
            <th class="p-3">Manufacturer</th>
            <th class="p-3">Model</th>
            <th class="p-3">License Plate</th>
            <th class="p-3">Battery %</th>
            <th class="p-3">Status</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(vehicle, index) in vehicles"
            :key="vehicle.vehicleId"
            class="border-b hover:bg-gray-50 dark:hover:bg-neutral-700"
          >
            <td class="p-3 font-semibold">
              <span class="text-purple-400 font-bold">
                {{ index + 1 + "." + " " }}
              </span>
              {{ vehicle.vehicleId }}
            </td>
            <td class="p-3">{{ vehicle.manufacturer }}</td>
            <td class="p-3">{{ vehicle.model }}</td>
            <td class="p-3">{{ vehicle.licensePlate }}</td>
            <td class="p-3">{{ vehicle.batteryLevel }}%</td>
            <td class="p-3">
              <span
                :class="{
                  'bg-green-200 text-green-800':
                    vehicle.vehicleStatus === 'IN_USE',
                  'bg-orange-200 text-orange-800':
                    vehicle.vehicleStatus === 'OUT_OF_SERVICE',
                  'bg-red-200 text-red-800':
                    vehicle.vehicleStatus === 'MAINTENANCE',
                }"
                class="px-3 py-1 rounded-md text-xs font-semibold"
              >
                {{ vehicle.vehicleStatus }}
              </span>
            </td>
            <td class="p-3 flex justify-end gap-3">
              <Button @click="editVehicle(vehicle.vehicleId)" :icon="Pen">
                Edit
              </Button>

              <Button
                @click="deleteVehicle(vehicle.vehicleId)"
                type="danger"
                :icon="TrashIcon"
                class="bg-red-300 text-red-700"
              >
                delete
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Add Vehicle Button -->
    <div class="mt-4 flex justify-end">
      <Button @click="addVehicle" :icon="PlusIcon"> Add New Vehicle </Button>
    </div>

    <Modal
      v-if="showModal"
      :vehicle="currentVehicle"
      @close="closeModal"
      @save="saveVehicle"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useAxios from "../../composables/useAxios";
import type { Vehicle } from "../../interface/api.interface";
import Button from "../generic/Button.vue";
import { TrashIcon, PlusIcon, Pen } from "lucide-vue-next";
import Modal from "../generic/Modal.vue";
import { useRouter } from "vue-router";

const { getData, postData, deleteData } = useAxios();
const vehicles = ref<Vehicle[]>([]);

const router = useRouter();

onMounted(async () => {
  try {
    vehicles.value = await getData("/vehicles"); // Fetch vehicles from API
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
  }
});

// 🛠 Edit Vehicle
const editVehicle = (vehicleId: string) => {
  alert("Edit vehicle with ID: " + vehicleId);
  router.push(`/admin/vehicles/edit/${vehicleId}`);
};

// 🛠 Delete Vehicle
const deleteVehicle = async (vehicleId: string) => {
  if (confirm("Are you sure you want to delete this vehicle?")) {
    try {
      await deleteData(`/vehicles/${vehicleId}`);
      vehicles.value = vehicles.value.filter((v) => v.vehicleId !== vehicleId);
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
    }
  }
};

// 🛠 Add Vehicle
const addVehicle = async () => {
  console.log("Adding new vehicle");
  router.push("/admin/vehicles/add");

  // const newVehicle = {
  //   vehicleId: "",
  //   manufacturer: "",
  //   model: "",
  //   licensePlate: "",
  //   batteryLevel: 100,

  //   vehicleStatus: "",
  // };
};
const showModal = ref(false);
const currentVehicle = ref<Vehicle | null>(null);

const openModal = (vehicle: Vehicle | null = null) => {
  currentVehicle.value = vehicle;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  currentVehicle.value = null;
};

const saveVehicle = async (vehicle: Vehicle) => {
  try {
    if (vehicle.vehicleId) {
      // Update existing vehicle
      await postData(`/vehicles/${vehicle.vehicleId}`, vehicle);
      const index = vehicles.value.findIndex(
        (v) => v.vehicleId === vehicle.vehicleId
      );
      if (index !== -1) {
        vehicles.value[index] = vehicle;
      }
    } else {
      // Add new vehicle
      const response = await postData("/vehicles", vehicle);
      vehicles.value.push(response.data);
    }
    closeModal();
  } catch (error) {
    console.error("Failed to save vehicle:", error);
  }
};
</script>
