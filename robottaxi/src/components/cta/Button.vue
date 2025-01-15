<template>
  <button
    class="px-4 py-2 bg-blue-600 text-white rounded flex gap-2 items-center border dark:border-blue-200"
  >
    <component :is="icon" v-if="icon" class="w-5 h-5" />
    <slot>Button</slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  icon?: any;
}>();
</script>
