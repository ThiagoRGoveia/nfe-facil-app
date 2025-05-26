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

  // Check for appState in Auth0 redirect
  if (to.path === '/' && auth.isAuthenticated) {
    // Get the appState from Auth0
    const appState = await auth.getAppState();
    
    // If we have purchase parameters in appState, redirect to checkout
    if (appState?.purchaseRef === 'purchase' && appState?.purchaseProduct) {
      return `/checkout?product=${appState.purchaseProduct}`;
    }
    
    // If we have a returnTo path in appState, redirect there
    if (appState?.returnTo) {
      return appState.returnTo;
    }
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
