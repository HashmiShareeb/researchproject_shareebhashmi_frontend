<script setup lang="ts">
import { X, Menu, Home, Bolt, Earth } from "lucide-vue-next";
</script>

<template>
  <div
    class="relative w-64 h-screen p-5 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-r-lg"
  >
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Tapxi</h1>
      <!-- <X class="ml-2" :size="24" /> -->
      <Menu class="ml-2" :size="24" />
    </div>

    <ul class="space-y-8 pt-6 cursor-pointer">
      <li>
        <!-- <RouterLink>

        </RouterLink> -->
        <span class="inline-flex gap-4">
          <Home />
          Home
        </span>
      </li>
      <li>
        <span class="inline-flex gap-4">
          <Bolt />
          Dashboard
        </span>
      </li>
      <li>
        <span class="inline-flex gap-4">
          <Earth />
          Map Overview
        </span>
      </li>
      <li>
        <span class="inline-flex gap-4">
          <Bolt />
          Settings
        </span>
      </li>
    </ul>
    <!-- account details -->
    <div class="absolute bottom-16">
      <div class="flex items-center justify-center space-x-2 mt-2">
        <!-- <img
        src="https://randomuser.me/api/portraits
        /
        "
        alt="profile"
        class="w-8 h-8 rounded-full"
      /> -->
        <div class="w-8 h-8 rounded-full bg-white"></div>
        <div>
          <p class="text-sm">John Doe</p>
          <p class="text-xs">
            <span class="text-green-500"> Active </span>
          </p>
        </div>
      </div>
    </div>

    <div class="absolute bottom-5 text-center">
      <p class="text-xs">© {{ new Date().getFullYear() }} MCT project by SH</p>
    </div>
  </div>
</template>
