/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import '@mdi/font/css/materialdesignicons.css';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Cookies
import Cookies from 'js-cookie';

import { useAuthStore } from './stores/auth';
// router
import router from './router/index';

const app = createApp(App)

registerPlugins(app)

app.use(router)

app.use(Cookies)

const authStore = useAuthStore()

authStore.initializeAuth()

app.mount('#app')
