import { defineStore } from "pinia";
import Cookies from "js-cookie";
import router from "../router/index.js"; // Import the router instance
import { useEchoStore } from '@/stores/echo';

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(response) {
      this.token = response.access_token; // Acesse diretamente access_token
      this.user = response.user; // Acesse diretamente user
      Cookies.set("access_token", response.access_token, {
        secure: true,
        sameSite: "Strict",
      }); // Use access_token
      localStorage.setItem("user", JSON.stringify(response.user));
      // console.log("this Token :", this.token);
      const echoStore = useEchoStore();
      echoStore.initEcho(this.token); // Initialize Echo with the token

    },
    async logout() {
      this.token = null;
      this.user = null;
      Cookies.remove("access_token");
      localStorage.removeItem("user");
      const echoStore = useEchoStore();
      echoStore.disconnectEcho(); // Disconnect Echo
      echoStore.leaveChannel('private-user.' + this.user.id); // Leave the private channel
      await router.push("/home");
    },
    initializeAuth() {
      const token = Cookies.get("access_token");
      const user = localStorage.getItem("user");
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },
  },
});
