/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes as autoRoutes } from 'vue-router/auto-routes'
import LandingPage from '../components/LandingPage.vue';
import LoginView from '@/components/login/LoginView.vue';
import LandingPageAluno from '@/components/Telaaluno/LandingPageAluno.vue';
import { useAuthStore } from '../stores/auth.js';
import CadastroView from '@/components/telaCadastro/CadastroView.vue';
const manualRoutes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginView, meta: { guest: true } },
  { path: '/home', component: LandingPageAluno, meta: { requiresAuth: true } },
  { path: '/register', component: CadastroView, meta: { guest: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([...autoRoutes, ...manualRoutes]),
})


router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

// This function checks authentication before each route change
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated){
    next('/login')
  }else{
    next()
  }
})

export default router
