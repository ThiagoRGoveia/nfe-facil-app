/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import pinia from '../stores'
import router from '../router'
import auth0 from './auth0'
import apollo from './apollo'
// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(router)
    .use(pinia)
    .use(auth0)
    .use(apollo)
}
