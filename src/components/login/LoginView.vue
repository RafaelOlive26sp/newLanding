<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center login-background">
        <v-card class="pa-8 rounded-xl login-card" max-width="600">
          <v-card-title class="justify-center text-h5 font-weight-bold text-primary">Bem-vindo de Volta!</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitLogin" ref="loginForm">
              <v-text-field v-model="email" label="E-mail" type="email" :rules="[rules.email, rules.required]" required prepend-inner-icon="mdi-email"
                variant="outlined" color="primary"></v-text-field>
              <v-text-field v-model="password" label="Senha" type="password" :rules="[rules.required, rules.password]" required prepend-inner-icon="mdi-lock"
                variant="outlined" color="primary"></v-text-field>
              <v-btn type="submit" color="primary" class="mt-4" block rounded>Entrar</v-btn>
            </v-form>
            <div class="text-center mt-1">
              <v-btn variant="text" color="primary" class="text-caption font-weight-medium"
                @click="goToRegister">
                Cadastre-se
              </v-btn>
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
  <DialogView v-model="dialogView" max-width="500">
    <cadatroAluno ></cadatroAluno>
  </DialogView>
  <SnackBarsView v-model="snackbar" :textContent="snackbarMessage">
    <template #actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </SnackBarsView>
</template>

<script setup>
  import { ref, watch} from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth.js'
  import { userUseStore } from '@/stores/user'
  import { login as loginApi } from '@/services/auth.js'
  import DialogView from '@/components/dialog/DialogView.vue'
  import cadatroAluno from '@/components/telaCadastro/CadastroView.vue'
  import SnackBarsView from '@/components/snackBar/snackBarView.vue'

  const useStore = userUseStore()
  const authStore = useAuthStore()
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const showError = ref(false)
  const dialogView = ref(false)
  const snackbarMessage = ref("");
  const snackbar = ref(false);
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

  watch(
    ()=>useStore.responseCadastro,
    async (newValue) =>{
      if (newValue) {
        dialogView.value = false,
        snackbarMessage.value = 'Usuario cadastro com sucesso',
        snackbar.value = true
      }
      return newValue.value = null
    }

  );

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
      throw error
      showError.value = true

      // Handle login error (e.g., show a notification)

    }
  }

  const goToHome = () => {
    router.push('/')
  }

  const goToRegister = () => {
    dialogView.value = true
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
