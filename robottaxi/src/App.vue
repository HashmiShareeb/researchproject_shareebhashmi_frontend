<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div class="dark:bg-gray-800 flex flex-col bg-white min-h-screen">
    <div class="maw-w-screen-xl mx-auto">
      <AppHeader />
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
<!-- <div
class="container bg-gradient-to-br from-blue-500 to-purple-500 h-screen flex justify-center items-center"
>
<h1 class="text-4xl text-white text-center">welcome</h1>
</div> -->
