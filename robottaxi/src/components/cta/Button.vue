<template>
    <button class="mt-4 p-2 bg-blue-500 text-white rounded flex items-center">
        <component :is="icon" v-if="icon" class="w-6 h-6 mr-2" />
        <slot>Button</slot>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    icon?: any;
}>();
</script>