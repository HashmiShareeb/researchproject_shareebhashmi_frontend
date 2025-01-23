<template>
  <section class="px-8 dark:text-white">
    <div
      class="w-full md:w-1/2 mx-auto p-4 bg-white dark:bg-neutral-800 rounded shadow"
    >
      <h2 class="text-xl font-medium mb-4">Register</h2>
      <form @submit.prevent="registerUser" class="space-y-4">
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
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter email"
            class="w-full p-2 border rounded-md dark:bg-neutral-700"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Roles</label>
          <input
            v-model="roles"
            type="text"
            placeholder="Enter roles (comma separated)"
            class="w-full p-2 border rounded-md dark:bg-neutral-700"
          />
        </div>
        <button
          type="submit"
          class="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Register
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
const email = ref("");
const roles = ref("");

const { postData } = useAxios();

const registerUser = async () => {
  try {
    //splits rollen met kommas
    const rolesList = roles.value.split(",").map((role) => role.trim());

    const response = await postData("/auth/register", {
      username: username.value,
      password: password.value,
      email: email.value,
      roles: rolesList,
    });

    alert("Registration successful!");
    console.log("User registered:", response);

    // Optionally, you can redirect the user to login page after registration
    // this.$router.push('/login');
  } catch (error) {
    console.error("Error registering user:", error);
    alert("Error during registration. Please try again.");
  }
};
</script>
