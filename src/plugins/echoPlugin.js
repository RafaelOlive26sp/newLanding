import { watch } from 'vue';
import { useEchoStore } from '@/stores/echo';
import { useAuthStore } from '@/stores/auth';


// Plugin para gerenciar a conexão com o Echo
// com base no estado de autenticação do usuário
// e reconectar automaticamente quando a conexão for perdida.
// Este plugin deve ser instalado no arquivo main.js ou main.ts do Vue.


export const echoPlugin = {
  install(app) {
    const echoStore = useEchoStore();
    const authStore = useAuthStore();

    watch(
      () => authStore.isAuthenticated,
      (isAuthenticated) => {
        if (isAuthenticated) {
          echoStore.connect();
        } else {
          echoStore.disconnect();
        }
      },
      { immediate: true }
    );

    // Reconexão automática
    window.addEventListener('online', () => {
      if (authStore.isAuthenticated && !echoStore.isConnected) {
        echoStore.connect();
      }
    });
  },
};
