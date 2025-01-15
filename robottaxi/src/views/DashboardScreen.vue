<script setup lang="ts">
import { MoonIcon } from "lucide-vue-next";
import Button from "../components/cta/Button.vue";
import { ref } from "vue";
import MapView from "../components/Map.vue";

const username = ref("User");
</script>

<template>
  <section class="container dark:text-white">
    <h1 class="text-lg">Welcome, {{ username }}</h1>
    <Button :icon="MoonIcon">Dark Mode</Button>
  </section>
  <MapView />
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>
