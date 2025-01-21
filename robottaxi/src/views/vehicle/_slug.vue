<template>
  <div class="dark:text-white">
    <Button
      @click="$router.go(-1)"
      text="Back"
      aria-label="Go back to the previous page"
    />
    <h1>Vehicle Details: {{ $route.params.manufacturer }}</h1>
    <p>Vehicle ID:{{ $route.params.id }}</p>
  </div>
</template>

<script lang="ts" setup>
import Button from "../../components/generic/Button.vue";
</script>
