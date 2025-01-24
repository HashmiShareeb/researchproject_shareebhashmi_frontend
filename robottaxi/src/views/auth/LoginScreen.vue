<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../../composables/useAuth";

const { login, error } = useAuth();
const router = useRouter();

const username = ref("");
const password = ref("");
const isLoggedIn = ref(false);

const handleLogin = async () => {
  const response = await login(username.value, password.value);
  if (response) {
    alert("Login successful!");
    localStorage.setItem("isLoggedIn", "true");
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
      <input v-model="username" type="text" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <router-link to="/register">Don't have an account? Register</router-link>
  </div>
  <div class="auth-container" v-else>
    <h2>You are already logged in</h2>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
.error {
  color: red;
}
</style>
