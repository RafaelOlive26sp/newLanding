<template>
  <v-footer height="40" app theme="dark">
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
    </a>
    <div class="text-caption text-disabled" style="position: absolute; right: 16px;">
      <v-btn variant="tonal" size="small" @click="handleLogout" color="warning" append-icon="mdi-logout">
        Sair
      </v-btn>
    </div>
  </v-footer>
</template>

<script setup>
  import { useAuthStore } from '@/stores/auth';
  import { logout as logoutApi } from '@/services/auth.js';
  import { useRouter } from 'vue-router';




  const AuthStore = useAuthStore();
  const router = useRouter()


  const items = [
    {
      title: 'Documentation GitHub',
      icon: `mdi-github`,
      href: 'https://github.com/RafaelOlive26sp/',
    },

  ]
  const handleLogout = async () => {
    try{
      const response = await logoutApi()
      AuthStore.logout(response)
      router.push('/');
    }catch (error) {
      console.error('Error ao fazer o Logout ',error)
    }
  }


</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
