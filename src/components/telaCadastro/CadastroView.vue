<template>
  <v-card class="pa-6" :max-width="isMobile ? '90vw' : '500px'" width="100%">
    <h2 class="text-center mb-4">Crie sua Conta</h2>
    <formCadastroUser ></formCadastroUser>
  </v-card>
</template>

<script setup>

  import { useDisplay } from 'vuetify'
  import formCadastroUser from '@/components/forms/formCadastroUser.vue'

  const { smAndDown } = useDisplay()

  const isMobile = computed(() => smAndDown.value)

</script>
