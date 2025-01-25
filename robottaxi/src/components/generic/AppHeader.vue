<script setup lang="ts">
import {
  Home,
  Bolt,
  Earth,
  PanelLeftClose,
  PanelRightClose,
  CarFront,
  User,
} from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "../../store/authStore";

const isCollapsed = ref(false);

const togglePanel = () => {
  isCollapsed.value = !isCollapsed.value;
};

const authStore = useAuthStore();
authStore.loadLoginState();

const isAdminRoute = computed(() => useRoute().name === "Admin");
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
        MCT Project
        <span>{{ authStore.user?.roles }}</span>
        <h2 class="" v-if="$route.name === 'Admin'">
          <span class="text-xl font-mono">Admin</span>
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
      <li :class="{ 'text-white font-bold': $route.name === 'Home' }">
        <RouterLink :to="{ name: 'Home' }">
          <span class="inline-flex gap-4">
            <Home
              :class="{ 'fill-current text-white': $route.name === 'Home' }"
            />
            <span v-if="!isCollapsed">Home</span>
          </span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Map' }">
          <span class="inline-flex gap-4">
            <Earth
              :class="{ 'fill-current text-white': $route.name === 'Map' }"
            />
            <span v-if="!isCollapsed">Map Overview</span>
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
      <li>
        <span class="inline-flex gap-4">
          <Bolt
            :class="{ 'fill-current text-white': $route.name === 'Settings' }"
          />
          <span v-if="!isCollapsed">Settings</span>
        </span>
      </li>
      <li>
        <RouterLink :to="{ name: 'Admin' }">
          <span class="inline-flex gap-4">
            <User
              :class="{ 'fill-current text-white': $route.name === 'Admin' }"
            />
            <span v-if="!isCollapsed">Admin</span>
          </span>
        </RouterLink>
      </li>
    </ul>
    <!-- account details -->
    <div
      :class="[
        !isCollapsed
          ? 'absolute bottom-16'
          : 'absolute bottom-16 right-0 left-0 w-10 h-10 mx-auto bg-white rounded-full',
      ]"
    >
      <button
        @click="
          () => {
            $router.push({ name: 'Account' });
          }
        "
        class="flex items-center justify-center space-x-2 mt-2 focus:outline-none"
        aria-label="User Account"
      >
        <div
          v-if="!isCollapsed"
          class="w-12 h-12 mr-4 rounded-full bg-white"
        ></div>
        <div>
          <p v-if="!isCollapsed" class="text-md font-semibold capitalize">SH</p>
          <p v-if="!isCollapsed" class="text-xs">
            <span class="text-green-500 font-mono capitalize">user</span>
          </p>
        </div>
      </button>
    </div>

    <div class="absolute bottom-5 text-center" v-if="!isCollapsed">
      <p class="text-xs">© {{ new Date().getFullYear() }} MCT project by SH</p>
    </div>
  </div>
</template>
