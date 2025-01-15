<script setup lang="ts">
import {
  X,
  Menu,
  Home,
  Bolt,
  Earth,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-vue-next";
import { ref } from "vue";

const isCollapsed = ref(true);

const togglePanel = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <div
    :class="[
      'relative h-screen p-5 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-r-lg flex-shrink-0 transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <div class="flex items-center justify-between mb-4">
      <h1 v-if="!isCollapsed" class="text-2xl font-bold">Tapxi</h1>
      <button @click="togglePanel">
        <PanelLeftClose class="ml-2" :size="24" />
      </button>
    </div>

    <ul class="space-y-8 pt-6 cursor-pointer">
      <li>
        <RouterLink :to="{ name: 'Home' }">
          <span class="inline-flex gap-4">
            <Home />
            <span v-if="!isCollapsed">Home</span>
          </span>
        </RouterLink>
      </li>
      <li>
        <span class="inline-flex gap-4">
          <Earth />
          <span v-if="!isCollapsed">Map Overview</span>
        </span>
      </li>
      <li>
        <span class="inline-flex gap-4">
          <Bolt />
          <span v-if="!isCollapsed">Settings</span>
        </span>
      </li>
    </ul>
    <!-- account details -->
    <div
      :class="[
        !isCollapsed
          ? 'absolute bottom-16'
          : 'absolute bottom-20 right-0 left-0',
      ]"
    >
      <div class="flex items-center justify-center space-x-2 mt-2">
        <div class="w-12 h-12 rounded-full bg-white"></div>
        <div>
          <p v-if="!isCollapsed" class="text-sm font-semibold">SH</p>
          <p v-if="!isCollapsed" class="text-xs">
            <span class="text-green-500">Active</span>
          </p>
        </div>
      </div>
    </div>

    <div class="absolute bottom-5 text-center" v-if="!isCollapsed">
      <p class="text-xs">© {{ new Date().getFullYear() }} MCT project by SH</p>
    </div>
  </div>
</template>
