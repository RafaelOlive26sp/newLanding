<template>
  <v-form v-model="formValid" @submit.prevent="submitForm">
    <v-text-field v-model="dataInputs.name" label="Nome" prepend-inner-icon="mdi-account" :rules="[rules.required]"
      required />

    <v-text-field v-model="dataInputs.email" label="E-mail" prepend-inner-icon="mdi-email"
      :rules="[rules.required, rules.email]" required />

    <v-text-field v-model="dataInputs.password" label="Senha" type="password" prepend-inner-icon="mdi-lock"
      :rules="[rules.required, rules.min]" required />

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
    required: v => !!v || 'Campo obrigatório.',
    email: v => /.+@.+\..+/.test(v) || 'E-mail inválido.',
    min: v => v.length >= 6 || 'Mínimo de 6 caracteres.',
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
