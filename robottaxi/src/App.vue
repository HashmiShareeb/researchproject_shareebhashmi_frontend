<script setup lang="ts">
import AppHeader from "./components/generic/AppHeader.vue";
import AppNavbar from "./components/generic/AppNavbar.vue";
</script>

<template>
  <div class="flex h-screen bg-white dark:bg-black dark:text-white">
    <!-- Sidebar (Fixed) -->
    <AppHeader class="h-screen fixed top-0 left-0 z-10" />

    <!-- Main Content (Pushes itself right, preventing overlap) -->
    <div class="flex flex-col flex-grow w-full">
      <AppNavbar class="z-20" />
      <div class="flex-grow overflow-auto px-4 py-8">
        <RouterView />
      </div>
    </div>
  </div>
</template>
