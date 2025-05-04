<template>
  <v-app :theme="theme">
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app color="grey-lighten-4" temporary>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ profileNavigation.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ profileNavigation.greenting }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item @click="showPayments = true, payments()">
          <v-list-item-title>Pagamentos</v-list-item-title>
        </v-list-item>
        <v-list-item @click="showAppointments = !showAppointments">
          <v-list-item-title>Meus Agendamentos</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <!-- App Bar -->
    <v-app-bar app color="teal-darken-1" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Área do Aluno</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ theme === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <!-- Profile Incomplete Alert -->
      <v-alert
        v-if="!ifCompleteProfile "
        class="ma-4"
        clickable
        color="amber-darken-2"
        type="warning"
        @click="dialogsHome(item, 'profileComplete')"
      >
        Complete seu cadastro aqui!
      </v-alert>

      <!-- Parallax Header -->
      <v-parallax
        height="350"
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1470&q=80"
      >
        <div class="d-flex flex-column align-center justify-center h-100">
          <h1 class="text-h4 font-weight-bold white--text">Bem-vindo ao seu espaço !</h1>
          <p class="text-subtitle-1 white--text">Foco, saúde e atenção personalizada.</p>
        </div>
      </v-parallax>

      <!-- Appointments Section -->
      <v-container class="py-6">
        <v-expand-transition>
          <div v-if="showAppointments">
            <h2 class="text-h5 teal--text text--darken-1 mb-4">Meus Agendamentos</h2>
            <v-row>
              <v-col
                v-for="(appointment, i) in appointments"
                :key="i"
                cols="12"
                md="4"
                sm="6"
              >
                <v-card class="pa-4" color="grey-lighten-4" elevation="2" rounded="lg">
                  <v-card-title class="text-h6 teal--text text--darken-1">
                    <v-icon color="teal" left>mdi-calendar</v-icon>
                    {{ appointment.date }}
                  </v-card-title>
                  <v-card-text>
                    <p class="mb-1">
                      <v-icon color="teal" left small>mdi-clock-outline</v-icon>
                      <strong>Horário:</strong> {{ appointment.time }}
                    </p>
                    <p class="mb-1">
                      <v-icon color="teal" left small>mdi-account-group</v-icon>
                      <strong>Turma:</strong> {{ appointment.group }}
                    </p>
                    <p>
                      <v-icon color="teal" left small>mdi-star</v-icon>
                      <strong>Nível:</strong> {{ appointment.level }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-container>

      <!-- Payments Dialog -->
      <v-dialog v-model="showPayments" width="500">
        <v-card color="grey-lighten-4">
          <v-card-title class="text-h6 teal--text text--darken-1">
            Meus Pagamentos
          </v-card-title>

          {{ useStore.errorMessagePayment }}
          <v-card-text>
            <!-- Lista de Pagamentos Pendentes -->
            <v-list v-if="pendingPayments.length > 0" class="mb-4">
              <v-list-item v-for="(payment, i) in pendingPayments" :key="i">
                <v-list-item-content>
                  <v-list-item-title>
                    Pagamento #{{ i + 1 }} - R$ {{ payment.amount }} kl
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Vencimento: {{ payment.dueDate }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <!-- Mensagem de Nenhum Pagamento -->
            <v-alert v-else class="mb-4" color="teal-lighten-3" type="info">
              Nenhum pagamento encontrado
            </v-alert>

            <!-- Seleção do Método de Pagamento -->
            <v-select
              v-model="selectedPaymentMethod"
              class="mb-4"
              dense
              :items="paymentMethods"
              label="Método de Pagamento"
              outlined
            />

            <!-- Resultado do Pagamento -->
            <v-expand-transition>
              <div v-if="paymentResult">
                <v-card class="text-center pa-4" flat>
                  <v-icon v-if="selectedPaymentMethod === 'PIX'" color="teal" size="100">
                    mdi-qrcode
                  </v-icon>
                  <p v-if="selectedPaymentMethod === 'PIX'" class="mt-2">
                    [Simulação de QR Code PIX]
                  </p>
                  <p v-if="selectedPaymentMethod === 'Boleto Bancário'">
                    Código do Boleto: {{ paymentResult }}
                  </p>
                </v-card>
              </div>
            </v-expand-transition>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              :color="selectedPaymentMethod === 'PIX' ? 'teal-darken-1' : 'teal-darken-1'"
              dark
              :disabled="!selectedPaymentMethod"
              @click="generatePayment"
            >
              {{ selectedPaymentMethod === 'PIX' ? 'Gerar QR Code PIX' : 'Gerar Boleto' }}
            </v-btn>
            <v-btn text @click="closePaymentsDialog">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <DialogView v-model="dialogVisible" max-width="500">
        <formCompleteProfile @error-form-students="errorFormStudentsCreate" @profile-complete-success="profileCompleteSuccess()" />
      </DialogView>

      <snackBarView v-model="snackBarVisible" :text-content="snackBarMessage">
        <template #actions>
          <v-btn color="pink" variant="text" @click="snackBarVisible = false">
            Fechar
          </v-btn>
        </template>
      </snackBarView>
    </v-main>
  </v-app>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import formCompleteProfile from '../forms/formCompleteProfile.vue'
  import DialogView from '../dialog/DialogView.vue'
  import { useAuthStore } from '@/stores/auth.js'
  import { logout as logoutApi } from '@/services/auth'
  import { getPayments as getPaymentsApi } from '@/services/user'
  import { userUseStore } from '@/stores/user.js';

  const useStore = userUseStore()
  const router = useRouter()
  const store = useAuthStore()
  const dialogVisible = ref(false)
  const drawer = ref(false)
  const showPayments = ref(false)
  const showAppointments = ref(false)
  const theme = ref('light')
  const isProfileComplete = ref(false)
  const selectedPaymentMethod = ref(null)
  const paymentResult = ref(null)
  const snackBarMessage = ref('')
  const snackBarVisible = ref(false)
  const profileNavigation = ref({
    name: store.user?.name,
    greenting: 'Seja bem vindo(a)',
  })


  onMounted(() => {
    // payments()
  })
  const ifCompleteProfile = computed(() => store.user?.CompleteStudentRecord)
  const userId = computed(() => store.user?.id)

  const appointments = ref([
    {
      date: 'Segunda-feira',
      time: '07:00 às 08:00',
      group: 'turma 1',
      level: 'beginner',
    },
    {
      date: 'Quarta-feira',
      time: '16:00 às 17:00',
      group: 'turma 1',
      level: 'beginner',
    },
    {
      date: 'Sexta-feira',
      time: '20:00 às 21:00',
      group: 'turma 1',
      level: 'beginner',
    },
  ])

  const paymentMethods = ref(['PIX', 'Boleto Bancário'])

  const pendingPayments = ref([
    { amount: '150,00', dueDate: '30/04/2025' },
    { amount: '150,00', dueDate: '30/05/2025' },
  ])


  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const dialogsHome = async (item, type) => {
    isProfileComplete.value = true // se for true o alert de complete sua conta sera aberto
    if (type === 'profileComplete') {
      dialogVisible.value = true
    }
  }
  const generatePayment = () => {
    if (selectedPaymentMethod.value === 'PIX') {
      paymentResult.value = '[Simulação de QR Code PIX]'
    } else if (selectedPaymentMethod.value === 'Boleto Bancário') {
      paymentResult.value = '1234 5678 9012 3456 7890 1234 5678 9012 3456'
    }
  }

  const profileCompleteSuccess = () => {
    snackBarVisible.value = true
    dialogVisible.value = false
    snackBarMessage.value = 'Cadastro completo com sucesso!'
  }

  const closePaymentsDialog = () => {
    showPayments.value = true
    selectedPaymentMethod.value = null
    paymentResult.value = null
  }
  const errorFormStudentsCreate = status => {

    if (status !== 409) {
      snackBarVisible.value = true
      snackBarMessage.value = 'Preencha todos os campos obrigatórios!'

    }
    if (status === 409) {
      dialogVisible.value = false

      snackBarVisible.value = true
      snackBarMessage.value = 'O Usuario já está com o perfil Completo.!'
      setTimeout(() => {
        handleLogout()
      },4000)
    }
  }
  const handleLogout = async () => {
    try {
      const response = await logoutApi()

      store.logout(response)
      await router.push('/login')
    } catch (error) {
      console.error('Error ao fazer o Logout ', error)
    }
  }
  const payments = async () => {
    const id = userId.value
    // console.log('id', id);

    try {
      const response = await getPaymentsApi(id)
      console.log('Pagamentos:', response)
      useStore.payments(response)
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error.response.data.message)
      useStore.errorPayments(error.response.data.message)
    }
  }

</script>

<style scoped>
.v-parallax > div {
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 20px;
  border-radius: 12px;
}

.v-alert {
  cursor: pointer;
}
</style>
