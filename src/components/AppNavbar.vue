<script setup lang="ts">
import { useTheme } from "vuetify";
import { useAuthStore } from "@/stores/auth";
import { ref, computed } from "vue";

const theme = useTheme();
const drawer = ref(false);
const auth = useAuthStore();

const isAuthenticated = computed(() => auth.isAuthenticated);

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

const handleAuth = () => {
  if (isAuthenticated.value) {
    auth.logout();
  } else {
    auth.login();
  }
};

// Navigation items array - show protected routes only when authenticated
const navItems = computed(() => [
  { title: "Home", icon: "mdi-home", to: "/" },
  { title: "Public (TESTE)", icon: "mdi-file-document-outline", to: "/public" },
  ...(isAuthenticated.value
    ? [
        { title: "Histórico", icon: "mdi-history", to: "/history" },
        { title: "Perfil", icon: "mdi-account", to: "/profile" },
      ]
    : []),
  { title: "API", icon: "mdi-api", to: "/api-doc" },
]);
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
  >
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
      />

      <v-list-item
        :prepend-icon="isAuthenticated ? 'mdi-logout' : 'mdi-login'"
        :title="isAuthenticated ? 'Logout' : 'Login'"
        @click="handleAuth"
      />

      <v-list-item
        :prepend-icon="
          theme.global.current.value.dark
            ? 'mdi-weather-sunny'
            : 'mdi-weather-night'
        "
        :title="theme.global.current.value.dark ? 'Light' : 'Dark'"
        @click="toggleTheme"
      />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon
      class="d-sm-none"
      @click="drawer = !drawer"
    />

    <v-app-bar-title>NFE Fácil</v-app-bar-title>

    <v-spacer />

    <!-- Hide these buttons on xs screens -->
    <div class="d-none d-sm-flex">
      <v-btn
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        variant="text"
      >
        {{ item.title }}
      </v-btn>

      <v-btn
        :prepend-icon="isAuthenticated ? 'mdi-logout' : 'mdi-login'"
        variant="text"
        @click="handleAuth"
      >
        {{ isAuthenticated ? "Logout" : "Login" }}
      </v-btn>

      <v-btn
        :prepend-icon="
          theme.global.current.value.dark
            ? 'mdi-weather-sunny'
            : 'mdi-weather-night'
        "
        variant="text"
        @click="toggleTheme"
      >
        {{ theme.global.current.value.dark ? "Light" : "Dark" }}
      </v-btn>
    </div>
  </v-app-bar>
</template>
