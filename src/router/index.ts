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

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
