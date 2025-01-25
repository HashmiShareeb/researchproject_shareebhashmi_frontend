<script setup lang="ts">
import AppHeader from "./components/generic/AppHeader.vue";
import AppNavbar from "./components/generic/AppNavbar.vue";
</script>

<template>
  <div class="dark:bg-black flex bg-white min-h-screen dark:text-white">
    <AppHeader />
    <!-- Main content -->
    <div class="w-full max-w-screen-2xl mx-auto">
      <AppNavbar />
      <div class="flex-grow px-4 py-8">
        <RouterView />
        <!-- Displays the current route's component -->
      </div>
    </div>
  </div>
</template>
