import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from "vue-router";

import VehicleList from "../components/vehicles/VehicleList.vue";
import AdminView from "../views/admin/AdminView.vue";
const isAuthenticated = () => !!localStorage.getItem("user");

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
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/LoginScreen.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/RegisterScreen.vue"),
  },
  // ADMIN
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true }, // ✅ Admin-only
  },
  {
    path: "/admin/vehicles", // ✅ Correct: Relative path ("/admin/vehicles")
    name: "Vehicle List",
    component: VehicleList,
    meta: { requiresAuth: true, requiresAdmin: true }, // ✅ Admin-only
  },
  {
    path: "/admin/vehicles/edit/:id", // ✅ Correct: Relative path ("/admin/vehicles/edit/:id")
    name: "Edit Vehicle",
    component: () => import("../views/vehicle/VehicleEdit.vue"),
    meta: { requiresAuth: true, requiresAdmin: true }, // ✅ Admin-only
  },
  {
    path: "/admin/vehicles/add", // ✅ Correct: Relative path ("/admin/vehicles/add")
    name: "Add Vehicle",
    component: () => import("../views/vehicle/VehicleAdd.vue"),
    meta: { requiresAuth: true, requiresAdmin: true }, // ✅ Admin-only
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
