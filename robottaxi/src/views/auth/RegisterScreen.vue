<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../../components/generic/Button.vue";
import useAxios from "../../composables/useAxios";
import useAuth from "../../composables/useAuth";

const { register, error } = useAuth();

const username = ref("");
const email = ref("");
const password = ref("");
const role = ref(["USER"]); // Default role
const router = useRouter();

const handleRegister = async () => {
  const response = await register(
    username.value,
    email.value,
    password.value,
    role.value
  );

  console.log("Register response:", response); // Debugging output

  if (response) {
    alert("Registration successful!");
    router.push("/login"); // Redirect after registration

    // Ensure email exists before storing
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username.value,
        email: email.value ?? "N/A", // Fallback if email is missing
        password: password.value,
        role: role.value,
      })
    );

    router.push("/login"); // Redirect after registration
  }
};

onMounted(() => {
  const storedLoginState = localStorage.getItem("isLoggedIn");
  if (storedLoginState === "true") {
    router.push("/"); // Redirect if already logged in
  }
});
</script>

<template>
  <div class="auth-container">
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          required
          class="block dark:bg-neutral-700 w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div class="mb-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="block dark:bg-neutral-700 w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div class="mb-4">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="block dark:bg-neutral-700 w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <Button type="submit" text="register" />
    </form>
    <div v-if="error" class="text-red-500 dark:text-red-400 mt-4">
      {{ error }}
    </div>
    <router-link
      to="/register"
      class="block mt-4 text-indigo-500 dark:text-indigo-400 w-full text-center"
      >already have an account?
      <span class="underline">login in</span></router-link
    >
  </div>
</template>
