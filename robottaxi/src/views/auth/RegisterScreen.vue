<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../../composables/useAuth";

const { register, error } = useAuth();
const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const roles = ref(["USER"]); // Default role

const handleRegister = async () => {
  const response = await register(
    username.value,
    password.value,
    email.value,
    roles.value
  );
  if (response) {
    alert("Registration successful! You can now log in.");
    router.push("/login");
  }
};
</script>

<template>
  <div class="auth-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <router-link to="/login">Already have an account? Log in</router-link>
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
