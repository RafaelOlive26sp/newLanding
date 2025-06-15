import {defineStore} from 'pinia';
import {ref} from 'vue';
import {createEcho} from '@/plugins/echo';


export const useEchoStore = defineStore('echo', () => {
  const echo = ref(null);

  function initEcho(token) {
    if (!echo.value) {
      echo.value = createEcho(token);
    }
  }

  function leaveChannel(channelName) {
    if (echo.value) {
      echo.value.leave(channelName);
    }
  }
  function disconnectEcho() {
    if (echo.value) {
      echo.value.disconnect();
      echo.value = null; // Reset the echo instance
    }
  }

   const isInitialized = computed(() => !!echo.value);

  return {initEcho, leaveChannel, echo, disconnectEcho, isInitialized};
});