/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import '@mdi/font/css/materialdesignicons.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { echoPlugin } from '@/plugins/echoPlugin';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Cookies
import Cookies from 'js-cookie';

import { useAuthStore } from './stores/auth';
// router
import router from './router/index';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);



const app = createApp(App)

registerPlugins(app)

app.use(router)

app.use(Cookies)

app.use(pinia)

app.use(echoPlugin);


const authStore = useAuthStore()

authStore.initializeAuth()

app.mount('#app')
