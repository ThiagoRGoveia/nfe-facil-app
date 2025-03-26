<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-vue-next";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import logo from "@/assets/logo.svg";

type NavItem = {
  title: string;
  icon: string;
  to: string;
  external?: boolean;
};

const mobileMenuOpen = ref(false);
const auth = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => auth.isAuthenticated);

const handleAuth = () => {
  if (isAuthenticated.value) {
    auth.logout();
  } else {
    auth.login();
  }
};

// Navigation items array - show protected routes only when authenticated
const navItems = computed<NavItem[]>(() => [
  ...(isAuthenticated.value
    ? [
        { title: "Dashboard", icon: "layout-dashboard", to: "/" },
        { title: "Histórico", icon: "history", to: "/history" },
        { title: "Perfil", icon: "user", to: "/profile" },
      ]
    : []),
  { title: "API", icon: "code", to: "/api-doc", external: true },
]);

const navigateTo = (path: string, external = false) => {
  if (external) {
    window.open(path, '_blank');
  } else {
    router.push(path);
  }
  mobileMenuOpen.value = false;
};
</script>

<template>
  <Sheet
    v-model:open="mobileMenuOpen"
    class="lg:hidden"
  >
    <SheetTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        class="lg:hidden"
      >
        <MenuIcon class="h-6 w-6" />
        <span class="sr-only">Toggle menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent
      side="left"
      class="w-[240px] sm:w-[300px]"
    >
      <nav class="flex flex-col gap-4 mt-8">
        <Button 
          v-for="item in navItems" 
          :key="item.title" 
          variant="ghost" 
          class="w-full justify-start cursor-pointer"
          @click="navigateTo(item.to, item.external)"
        >
          {{ item.title }}
          <span
            v-if="item.external"
            class="ml-1 inline-block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-external-link"
            ><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line
              x1="10"
              y1="14"
              x2="21"
              y2="3"
            /></svg>
          </span>
        </Button>
        
        <Button 
          variant="ghost" 
          class="w-full justify-start cursor-pointer"
          @click="handleAuth"
        >
          {{ isAuthenticated ? "Sair" : "Entrar" }}
        </Button>
        
        <div class="px-4">
          <ThemeToggle />
        </div>
      </nav>
    </SheetContent>
  </Sheet>

  <!-- Desktop Navigation -->
  <header class="border-b sticky top-0 z-40 w-full bg-background">
    <div class="container flex h-16 items-center px-4 sm:px-6">
      <div
        class="mr-4 cursor-pointer"
        @click="navigateTo('/')"
      >
        <img
          :src="logo"
          alt="NFE Fácil"
          class="h-8"
        >
      </div>
      
      <!-- Desktop Navigation Menu -->
      <NavigationMenu class="hidden lg:flex ml-auto">
        <NavigationMenuList>
          <NavigationMenuItem
            v-for="item in navItems"
            :key="item.title"
          >
            <NavigationMenuLink 
              :class="[navigationMenuTriggerStyle(), 'cursor-pointer']"
              @click="navigateTo(item.to, item.external)"
            >
              {{ item.title }}
              <span
                v-if="item.external"
                class="ml-1 inline-block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-external-link"
                ><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line
                  x1="10"
                  y1="14"
                  x2="21"
                  y2="3"
                /></svg>
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuLink 
              :class="[navigationMenuTriggerStyle(), 'cursor-pointer']"
              @click="handleAuth"
            >
              {{ isAuthenticated ? "Logout" : "Login" }}
            </NavigationMenuLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <ThemeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </header>
</template>
