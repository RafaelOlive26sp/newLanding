<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center login-background">
        <v-card class="pa-8 rounded-xl login-card" max-width="600">
          <v-card-title class="justify-center text-h5 font-weight-bold text-primary">Bem-vindo de Volta!</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitLogin" ref="loginForm">
              <v-text-field v-model="email" label="E-mail" type="email" required prepend-inner-icon="mdi-email"
                variant="outlined" color="primary"></v-text-field>
              <v-text-field v-model="password" label="Senha" type="password" required prepend-inner-icon="mdi-lock"
                variant="outlined" color="primary"></v-text-field>
              <v-btn type="submit" color="primary" class="mt-4" block rounded>Entrar</v-btn>
            </v-form>
            <div class="text-center mt-4">
              <span class="text-subtitle-2">Novo por aqui?</span>
              <v-btn text color="secondary" class="ml-1" @click="goToRegister">Cadastre-se</v-btn>
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn text @click="goToHome" class="text-secondary">Voltar para Início</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
      <v-snackbar v-model="showError" color="error">
        Erro ao fazer login. Verifique suas credenciais e tente novamente.
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="showError = false">Fechar</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth.js'
  import { login as loginApi } from '@/services/auth.js'

  const authStore = useAuthStore()
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const showError = ref('')

  const submitLogin = async () => {
    const data = {
      email: email.value,
      password: password.value,
    }
    try {
      const response = await loginApi(data)
      authStore.login(response)
      router.push('/home');

    } catch (error) {
      console.error('Login failed:', error)
      showError.value = true

      // Handle login error (e.g., show a notification)

    }
  }

  const goToHome = () => {
    router.push('/')
  }

  const goToRegister = () => {
    router.push('/register')
  }
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.login-background {
  background: linear-gradient(135deg, #f8f9fa, #e3f2fd);
}

.login-card {
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
