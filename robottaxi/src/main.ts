import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import axios from "axios";
import useAxios from "./composables/useAxios";
import { createPinia } from "pinia";
// // Configure axios globally if needed
// axios.defaults.baseURL = 'http://localhost:8080/api/auth';
// axios.defaults.headers.common['Content-Type'] = 'application/json';

const app = createApp(App);
//pinia
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount("#app");
