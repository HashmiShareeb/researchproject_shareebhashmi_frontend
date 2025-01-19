import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from "vue-router";

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
    path: "/vehicles",
    name: "Vehicle",
    component: () => import("../views/vehicle/IndexView.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
