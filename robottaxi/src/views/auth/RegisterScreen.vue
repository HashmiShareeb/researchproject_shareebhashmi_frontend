<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="user.username" placeholder="Username" required />
      <input
        v-model="user.password"
        type="password"
        placeholder="Password"
        required
      />
      <input v-model="user.email" type="email" placeholder="Email" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
//import { useAuth } from '../composables/useAuth';

export default {
  setup() {
    const { registerUser, errorMessage } = useAuth();
    const user = ref({
      username: "",
      password: "",
      email: "",
      roles: ["USER"],
    });
    const error = errorMessage;

    const handleRegister = async () => {
      const success = await registerUser(user.value);
      if (success) {
        alert("Registration successful!");
      }
    };

    return {
      user,
      error,
      handleRegister,
    };
  },
};
</script>
