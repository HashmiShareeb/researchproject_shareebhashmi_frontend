<template>
  <section class="px-8 dark:text-white">
    <div
      class="w-full md:w-1/2 mx-auto p-4 bg-neutral-100 dark:bg-neutral-800 rounded shadow"
    >
      <h2 class="text-xl font-medium mb-4">Login</h2>
      <form @submit.prevent="loginUser" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter username"
            class="w-full p-2 border rounded-md dark:bg-neutral-700"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="w-full p-2 border rounded-md dark:bg-neutral-700"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useAxios from "../../composables/useAxios";

const username = ref("");
const password = ref("");

const { postData } = useAxios();

const loginUser = async () => {
  try {
    const response = await postData("/auth/login", {
      username: username.value,
      password: password.value,
    });
    // No need to manually handle the session as Spring Security will set the cookie
    alert("Login successful!");
    console.log("User logged in:", response);
  } catch (error) {
    console.error("Error logging in user:", error);
    alert("Error during login.");
  }
};
// const logoutUser = async () => {
//   try {
//     await postData("/auth/logout");
//     alert("Logout successful!");
//     console.log("User logged out");
//   } catch (error) {
//     console.error("Error logging out user:", error);
//     alert("Error during logout.");
//   }
// };
</script>
