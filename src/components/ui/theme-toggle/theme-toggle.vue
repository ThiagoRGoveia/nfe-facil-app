<script setup lang="ts">
import { useTheme } from '../theme-provider/use-theme'
import { Button } from '../button'
import { Moon, Sun } from 'lucide-vue-next'

defineOptions({
  name: 'ThemeToggle',
})

const { currentTheme, toggleTheme } = useTheme()
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    class="rounded-full"
    @click="toggleTheme"
  >
    <Sun
      v-if="currentTheme === 'light'"
      class="h-5 w-5"
    />
    <Moon
      v-else-if="currentTheme === 'dark'"
      class="h-5 w-5"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template> 