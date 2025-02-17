<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
const drawer = ref(false);
const isAuthenticated = ref(false); // This should be connected to your auth state management

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

const toggleAuth = () => {
  isAuthenticated.value = !isAuthenticated.value;
};

// Navigation items array for easy maintenance
const navItems = [
  { title: "Home", icon: "mdi-home", to: "/" },
  { title: "Perfil", icon: "mdi-account", to: "/profile" },
  { title: "API", icon: "mdi-api", to: "/api-doc" },
];
</script>

<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
      />

      <v-list-item
        @click="toggleAuth"
        :prepend-icon="isAuthenticated ? 'mdi-logout' : 'mdi-login'"
        :title="isAuthenticated ? 'Logout' : 'Login'"
      />

      <v-list-item
        @click="toggleTheme"
        :prepend-icon="
          theme.global.current.value.dark
            ? 'mdi-weather-sunny'
            : 'mdi-weather-night'
        "
        :title="theme.global.current.value.dark ? 'Light' : 'Dark'"
      />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      class="d-sm-none"
    ></v-app-bar-nav-icon>

    <v-app-bar-title>NFE Fácil</v-app-bar-title>

    <v-spacer></v-spacer>

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
        @click="toggleAuth"
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
