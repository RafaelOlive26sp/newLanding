import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { createEcho } from '@/plugins/echo';
export const useEchoStore = defineStore('echo',{
    state: () => ({
        echo: null,
        isConnected: false,
        wasConnected: false,
    }),
    persist: {
        paths: ['wasConnected'],
    },
    actions: {
      // Método para criar uma instância do Echo
      // e conectar-se ao servidor usando o token de autenticação
      // O token é obtido dos cookies, que devem ser definidos
      // no momento do login do usuário.
      connect() {
        const token = Cookies.get('access_token');
        if (!token) return;

        try {
          this.echo = createEcho(token);
          this.isConnected = true;
          this.wasConnected = true;
        } catch (error) {
          console.error('❌ Erro ao conectar Echo:', error);
          this.isConnected = false;
        }
      },
      disconnect() {
        try {
          this.echo?.disconnect();
        } finally {
          this.echo = null;
          this.isConnected = false;
          this.wasConnected = false;
        }
      },



    }
});
