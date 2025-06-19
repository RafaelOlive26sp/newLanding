<template>
  <v-form v-model="formValid" @submit.prevent="submitForm">
    <v-text-field v-model="dataInputs.name" label="Nome" prepend-inner-icon="mdi-account" :rules="[rules.required]"
      required />

    <v-text-field v-model="dataInputs.email" label="E-mail" prepend-inner-icon="mdi-email"
      :rules="[rules.required, rules.email]" required />

    <v-text-field v-model="dataInputs.password" label="Senha" type="password" prepend-inner-icon="mdi-lock"
      :rules="[rules.required, rules.password]" required />

    <v-btn :loading="loading" @click="loading = !loading" type="submit" class="mt-4" block color="primary" :disabled="!formValid">
      Cadastrar
      <template v-slot:loader>
        <v-progress-linear indeterminate></v-progress-linear>
      </template>
    </v-btn>

  </v-form>
</template>

<script setup>
  import { ref } from 'vue'
  import { registerUser as registerApi } from '@/services/user.js'
  import { userUseStore } from '@/stores/user';


  const userStore = userUseStore()

  const dataInputs = ref({
    name: '',
    email: '',
    password: '',
  })
  const formValid = ref(false);
  const rules = {
    required: (value) => !!value || 'Campo obrigatório',
    email: (value) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) || 'E-mail inválido';
    },
    password: (value) => {
      if (value.length < 6) return 'A senha deve ter pelo menos 6 caracteres';
      if (!/(?=.*[a-z])/.test(value)) return 'A senha deve conter pelo menos uma letra minúscula';
      if (!/(?=.*[A-Z])/.test(value)) return 'A senha deve conter pelo menos uma letra maiúscula';
      if (!/(?=.*\d)/.test(value)) return 'A senha deve conter pelo menos um número';
      if (!/^[a-zA-Z\d]+$/.test(value)) return 'A senha só pode conter letras e números';
      return true;
    },

  }
  const loading = ref(false)



  const submitForm = async () => {
    try {
      const response = await registerApi(dataInputs)
      userStore.cadastroUser(response)
      setTimeout(() => {
        loading.value = true
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
</script>
