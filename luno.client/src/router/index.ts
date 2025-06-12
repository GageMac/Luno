import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  // Add more routes here as you create more pages/components
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
