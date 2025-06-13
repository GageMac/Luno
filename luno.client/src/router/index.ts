import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import HomePage from "../components/HomePage.vue";
import AuthPage from "../components/AuthPage.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { requiresGuest: true }, // Redirect to dashboard if already logged in
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage,
    meta: { requiresGuest: true }, // Redirect to dashboard if already logged in
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // Require authentication
  },
  // Redirect any unknown routes to home
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to auth page if not authenticated
    next("/auth");
    return;
  }

  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirect to dashboard if already authenticated
    next("/dashboard");
    return;
  }

  // Allow navigation
  next();
});

export default router;
