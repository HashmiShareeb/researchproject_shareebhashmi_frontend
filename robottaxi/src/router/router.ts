import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from "vue-router";

import VehicleList from "../components/vehicles/VehicleList.vue";
import AdminView from "../views/admin/AdminView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/DashboardScreen.vue"),
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("../views/MapView.vue"),
  },
  {
    path: "/vehicles/:id",
    name: "VehicleDetail",
    component: () => import("../views/vehicle/_slug.vue"),
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("../views/auth/LoginScreen.vue"),
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: () => import("../views/auth/RegisterScreen.vue"),
  // },
  // ADMIN
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
  },
  {
    path: "/admin/vehicles", // ✅ Correct: Relative path ("/admin/vehicles")
    name: "Vehicle List",
    component: VehicleList,
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
