<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="credentials.username" placeholder="Username" required />
        <input v-model="credentials.password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuth } from '../composables/useAuth';
  
  export default {
    setup() {
      const { loginUser, errorMessage } = useAuth();
      const credentials = ref({ username: '', password: '' });
      const error = errorMessage;
  
      const handleLogin = async () => {
        const success = await loginUser(credentials.value);
        if (success) {
          alert('Login successful!');
        }
      };
  
      return {
        credentials,
        error,
        handleLogin,
      };
    },
  };
  </script>
  