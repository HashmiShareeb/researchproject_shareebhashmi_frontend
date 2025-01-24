<template>
  <button
    :class="[
      !text
        ? 'rounded-lg p-3 bg-indigo-600 text-white flex gap-2 items-center border dark:border-indigo-200'
        : 'px-4 py-2 bg-indigo-600 text-white rounded-lg flex gap-2 items-center border dark:border-indigo-200',
    ]"
  >
    <component :is="icon" v-if="icon" class="w-5 h-5" />
    <span v-if="text"
      ><slot>{{ text }}</slot></span
    >
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  icon?: any;
  text?: string;
}>();
</script>
