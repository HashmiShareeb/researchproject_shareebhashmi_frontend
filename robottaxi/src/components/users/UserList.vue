<template>
  <div v-if="ride" class="">
    <div class="mb-4">
      <span class="block font-semibold">User:</span>
      <span class="block text-indigo-400">{{ ride.user.username }}</span>
    </div>
    <div>
      <span class="block font-semibold">Email:</span>
      <span class="block text-indigo-400">{{ ride.user.email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { ActiveRide } from "../../interface/api.interface";

defineProps<{
  ride: ActiveRide;
}>();
</script>
