<template>
  <v-main>
    <router-view />
  </v-main>

  <AppFooter v-if="userLogado"/>
</template>

<script setup>
  import { onMounted, computed } from 'vue';
  import { useAuthStore } from '@/stores/auth';

  const AuthStore = useAuthStore()
  onMounted(() => {
    userLogado.value
  });
  const userLogado = computed(() => {
    return AuthStore.token !== null
  });
</script>
