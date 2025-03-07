<script setup lang="ts">
import { useTheme } from '../theme-provider/use-theme'
import { Button } from '../button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu'
// Import Lucide icons only if they are used in the project
import { Moon, Sun, Zap, FileText, LandPlot, Music, SparklesIcon, Paintbrush } from 'lucide-vue-next'

defineOptions({
  name: 'ThemeToggle',
})

const { currentTheme, setTheme } = useTheme()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="rounded-full">
        <Sun v-if="currentTheme === 'light'" class="h-5 w-5" />
        <Moon v-else-if="currentTheme === 'dark'" class="h-5 w-5" />
        <Zap v-else-if="currentTheme === 'ai-future'" class="h-5 w-5" />
        <FileText v-else-if="currentTheme === 'paper'" class="h-5 w-5" />
        <LandPlot v-else-if="currentTheme === 'old-west'" class="h-5 w-5" />
        <Music v-else-if="currentTheme === 'queer-rock'" class="h-5 w-5" />
        <SparklesIcon v-else-if="currentTheme === 'chaos'" class="h-5 w-5 animate-spin-slow" />
        <Paintbrush v-else class="h-5 w-5" />
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
      <DropdownMenuItem @click="setTheme('ai-future')">
        <Zap class="mr-2 h-4 w-4" />
        <span>AI Future</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('paper')">
        <FileText class="mr-2 h-4 w-4" />
        <span>Paper</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('old-west')">
        <LandPlot class="mr-2 h-4 w-4" />
        <span>Old West</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('queer-rock')">
        <Music class="mr-2 h-4 w-4" />
        <span>80s Queer Rock</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('chaos')">
        <SparklesIcon class="mr-2 h-4 w-4 animate-bounce" />
        <span class="animate-pulse">CHAOS!</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('harmony')">
        <Paintbrush class="mr-2 h-4 w-4" />
        <span class="italic">Harmony</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template> 