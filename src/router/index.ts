/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import { isPublicRoute } from "./public-routes";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// Global navigation guard
router.beforeEach(async (to) => {
  const auth = useAuthStore();

  // Wait for auth to initialize
  if (auth.isLoading) {
    await auth.initialize();
  }

  // Allow public routes
  if (isPublicRoute(to.path)) {
    return true;
  }

  // Protected route - check authentication
  if (!auth.isAuthenticated) {
    // Save the intended destination for post-login redirect
    const loginPath = `/login?redirect=${encodeURIComponent(to.fullPath)}`;
    return loginPath;
  }

  return true;
});


export default router;
