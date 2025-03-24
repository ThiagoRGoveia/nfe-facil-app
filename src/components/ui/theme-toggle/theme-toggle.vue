<script setup lang="ts">
import { useTheme } from '../theme-provider/use-theme'
import { Button } from '../button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu'
import { Moon, Sun } from 'lucide-vue-next'

defineOptions({
  name: 'ThemeToggle',
})

const { currentTheme, setTheme } = useTheme()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="icon"
        class="rounded-full"
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
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="setTheme('light')">
        <Sun class="mr-2 h-4 w-4" />
        <span>Light</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('dark')">
        <Moon class="mr-2 h-4 w-4" />
        <span>Carbon Dark</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template> 