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
const navItems = computed(() => [
  ...(isAuthenticated.value
    ? [
        { title: "Dashboard", icon: "layout-dashboard", to: "/" },
        { title: "Histórico", icon: "history", to: "/history" },
        { title: "Perfil", icon: "user", to: "/profile" },
      ]
    : []),
  { title: "API", icon: "code", to: "/api-doc" },
]);

const navigateTo = (path: string) => {
  router.push(path);
  mobileMenuOpen.value = false;
};
</script>

<template>
  <!-- Mobile Menu (Sheet component from shadcn) -->
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
          @click="navigateTo(item.to)"
        >
          {{ item.title }}
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
      <div class="mr-4 font-bold text-lg">
        NFE Fácil
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
              @click="navigateTo(item.to)"
            >
              {{ item.title }}
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
