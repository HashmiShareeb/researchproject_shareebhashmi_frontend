<script setup lang="ts">
import {
  Home,
  Bolt,
  Earth,
  PanelLeftClose,
  PanelRightClose,
  CarFront,
  User,
  Shield,
  LogOut,
} from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "../../store/authStore";

import Button from "./Button.vue";

const isCollapsed = ref(false);

const togglePanel = () => {
  isCollapsed.value = !isCollapsed.value;
};

const authStore = useAuthStore();
authStore.loadLoginState();

const username = ref("");
const isAdminRoute = computed(() => useRoute().name === "Admin");

const isLoggedIn = ref(false);
//pinia login hier
const storedLoginState = localStorage.getItem("isLoggedIn");
if (storedLoginState === "true") {
  isLoggedIn.value = true;

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      username.value = user.username ?? "Guest";
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
}
</script>

<template>
  <div
    :class="[
      'relative p-5 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-r-lg',
      isCollapsed ? 'w-18' : 'w-64',
    ]"
  >
    <div class="flex items-center justify-between mb-4">
      <h1 v-if="!isCollapsed" class="text-2xl font-bold">
        Smart Wheels
        <h2 class="" v-if="$route.name === 'Admin'">
          <span class="text-sm">Admin</span>
        </h2>
      </h1>

      <button @click="togglePanel">
        <PanelLeftClose
          v-if="!isCollapsed"
          :class="[isCollapsed ? '' : 'ml-2']"
          :size="24"
        />
        <PanelRightClose v-else :size="24" />
      </button>
    </div>

    <ul class="space-y-8 pt-6 cursor-pointer mx-auto">
      <li>
        <RouterLink :to="{ name: 'Admin' }">
          <span class="inline-flex gap-4">
            <Shield
              :class="{ 'fill-current text-white': $route.name === 'Admin' }"
            />
            <span v-if="!isCollapsed">Admin</span>
          </span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Vehicle List' }">
          <span class="inline-flex gap-4">
            <CarFront
              :class="{
                'fill-current text-white': $route.name === 'Vehicle',
              }"
            />
            <span v-if="!isCollapsed">Vehicle managment</span>
          </span>
        </RouterLink>
      </li>
    </ul>
    <!-- account details -->
    <div :class="[!isCollapsed, 'absolute bottom-16']">
      <div
        class="flex items-center justify-center space-x-2 mt-2 focus:outline-none"
        aria-label="User Account"
      >
        <div
          v-if="!isCollapsed && isLoggedIn"
          class="w-12 h-12 mr-4 rounded-full bg-white dark:bg-neutral-800 dark:text-white flex items-center justify-center text-black font-bold"
        >
          {{ username.charAt(0).toUpperCase() }}
        </div>
        <div v-if="isLoggedIn">
          <p v-if="!isCollapsed" class="text-md font-semibold capitalize">
            {{ username }}
          </p>
        </div>
      </div>

      <div v-if="isLoggedIn" class="flex justify-center mt-4">
        <Button
          :class="[!isCollapsed ? 'p-0' : 'text-red-500']"
          @click="authStore.logout"
          :text="!isCollapsed ? 'Logout' : ''"
          :icon="LogOut"
        />
      </div>
    </div>

    <div class="absolute bottom-5" v-if="!isCollapsed">
      <p class="text-xs">
        © {{ new Date().getFullYear() }} MCT project by Shareeb Hashmi
      </p>
    </div>
  </div>
</template>
