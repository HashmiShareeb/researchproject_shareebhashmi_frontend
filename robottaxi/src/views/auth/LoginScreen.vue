<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../../composables/useAuth";
import Button from "../../components/generic/Button.vue";

const { login, error } = useAuth();
const router = useRouter();

const username = ref("");
const password = ref("");
const isLoggedIn = ref(false);

const handleLogin = async () => {
  const response = await login(username.value, password.value);

  console.log("Login response:", response); // Debugging output

  if (response) {
    alert("Login successful!");
    localStorage.setItem("isLoggedIn", "true");

    // Ensure email exists before storing
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username.value,
        email: response.email ?? "N/A", // Fallback if email is missing
      })
    );

    router.push("/"); // Redirect after login
  }
};

onMounted(() => {
  const storedLoginState = localStorage.getItem("isLoggedIn");
  if (storedLoginState === "true") {
    isLoggedIn.value = true;
    router.push("/"); // Redirect if already logged in
  }
});
</script>

<template>
  <div class="auth-container" v-if="!isLoggedIn">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          required
          class="block dark:bg-neutral-700 w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="block dark:bg-neutral-700 w-full p-2 border border-gray-300 rounded-md"
        required
      />
      <div class="mt-4">
        <Button type="submit" text="Login" />
      </div>
    </form>
    <p v-if="error" class="text-red-500 dark:text-red-400">{{ error }}</p>
    <router-link
      to="/register"
      class="block mt-4 text-indigo-500 dark:text-indigo-400 w-full text-center"
      >Don't have an account? Register</router-link
    >
  </div>
  <div class="container" v-else>
    <h2>You are already logged in</h2>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>
