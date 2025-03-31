// Plugins
import { registerPlugins } from '@/plugins'
import '@/assets/index.css'

// Components
import App from './App.vue'

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (import.meta.env.VITE_ENV) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
