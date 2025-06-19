/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
// import echo from './echo'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)

  // Make echo available globally
  // window.Echo = echo
}
