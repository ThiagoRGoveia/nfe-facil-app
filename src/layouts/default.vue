<template>
  <v-main>
    <AppNavbar />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="8">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
//
</script>
