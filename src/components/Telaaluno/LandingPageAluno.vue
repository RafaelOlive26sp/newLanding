<template>
  <v-app :theme="theme">
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app color="grey-lighten-4" temporary>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{
              profileNavigation.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              profileNavigation.greenting
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item @click="(showPayments = true), payments()">
          <v-list-item-title>Pagamentos</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app color="teal-darken-1" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title
        class="text-h6 toolbar-title-responsive"
        style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
      >
        Área do Aluno
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggleTheme">
        <v-icon>{{
          theme === "light" ? "mdi-weather-night" : "mdi-white-balance-sunny"
        }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <!-- Profile Incomplete Alert -->
      <v-alert
        v-if="!ifCompleteProfile"
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
          <h1 class="text-h4 font-weight-bold white--text">
            Bem-vindo ao seu espaço !
          </h1>
          <p class="text-subtitle-1 white--text">
            Foco, saúde e atenção personalizada.
          </p>
        </div>
      </v-parallax>

      <!-- Appointments Section -->
      <v-container class="py-6">
        <v-expand-transition>
          <div>
            <h2 class="text-h5 teal--text text--darken-1 mb-4">
              Meus Agendamentos
            </h2>
            <v-alert
              v-if="errorMessagesOther.status"
              border="top"
              prominent
              type="warning"
              variant="outlined"
            >
              {{ errorMessagesOther?.message }}
            </v-alert>
            <v-row v-else>
              <template v-for="(appointment, i) in responseAppointmentsGet.data" :key="appointment.id">
                <v-col
                  v-for="(schedule, j) in appointment.classe.schedules_patterns"
                  :key="`card-${i}-${j}`"
                  cols="12"
                  md="4"
                  sm="6"
                >
                  <v-card
                    class="pa-4 position-relative"
                    :color="isAbsent(appointment.id, schedule.day_of_week) ? '#fdecea' : 'grey-lighten-4'"
                    elevation="2"
                    rounded="lg"
                  >
                    <v-btn
                      icon
                      size="x-small"
                      variant="text"
                      color="grey"
                      class="position-absolute"
                      style="top: 6px; right: 6px;"
                      @click="toggleFalta(appointment.id, schedule.day_of_week)"
                    >
                      <v-icon size="18">mdi-close-circle-outline</v-icon>
                      <v-tooltip activator="parent" location="top">Faltar</v-tooltip>
                    </v-btn>

                    <v-card-title class="text-h6 teal--text text--darken-1">
                      <v-icon color="teal" left>mdi-calendar</v-icon>
                      {{ capitalize(schedule.day_of_week) }}
                    </v-card-title>

                    <v-card-text>
                      <p class="mb-1">
                        <v-icon color="teal" left small>mdi-clock-outline</v-icon>
                        <strong>Horário:</strong> {{ formatTime(schedule.start_time) }} - {{ formatTime(schedule.end_time) }}
                      </p>
                      <p class="mb-1">
                        <v-icon color="teal" left small>mdi-account-group</v-icon>
                        <strong>Turma:</strong> {{ appointment.classe.name }}
                      </p>
                      <p>
                        <v-icon color="teal" left small>mdi-star</v-icon>
                        <strong>Nível:</strong> {{ appointment.classe.level }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </div>
        </v-expand-transition>
      </v-container>

      <!-- Payments Dialog -->
      <v-dialog v-model="showPayments" width="500" >

        <v-card color="grey-lighten-4">
          <v-card-title class="text-h6 teal--text text--darken-1">
            Meus Pagamentos
          </v-card-title>
          <v-card-text>
            <!-- Lista de Pagamentos Pendentes -->
            <v-list v-if="notPayments.status !== 404" class="mb-4">
              <v-list-item v-for="(payment, i) in dataPayments" :key="i">
                <v-list-item-content>
                  <v-list-item-title>Pagamento #{{ i + 1 }} - R$ {{ payment.amount }}</v-list-item-title>
                  <v-list-item-subtitle>Vencimento: {{ payment.due_date }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Status: <span class="text-yellow-darken-3 text-overline font-weight-black">{{ payment.status }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <!-- Mensagem de Nenhum Pagamento -->
            <v-alert v-else class="mb-4" color="teal-lighten-3" type="info">
              {{ notPayments.message }}
            </v-alert>

            <!-- Seleção do Método de Pagamento -->
            <v-select
              v-if="!isProcessing && notPayments.status === 404"
              v-model="selectedPaymentMethod"
              class="mb-4"
              dense
              :items="paymentMethods"
              label="Método de Pagamento"
              outlined
            />

            <!-- Campo de Valor do Pagamento -->
            <v-text-field
              v-if="selectedPaymentMethod === 'PIX'"
              v-model="paymentAmount"
              class="mb-4"
              dense
              label="Valor do Pagamento"
              outlined
              prefix="R$"
              :rules="[rules.required, rules.min]"
              type="number"
            />
              <!-- Boatao para  Pagamento -->
            <v-card-actions v-if="paymentAmount">
              <v-spacer />
              <v-btn
                :color="'teal-darken-1'"
                dark
                :disabled="!selectedPaymentMethod || !paymentAmount"
                @click="generatePayment"
              >
                {{ selectedPaymentMethod === "PIX" ? "Gerar QR Code PIX" : "Gerar Boleto" }}
              </v-btn>
              <v-btn text @click="closePaymentsDialog">Fechar</v-btn>
            </v-card-actions>

            <!-- Loader de Processamento -->
            <v-progress-circular
              v-if="isProcessing"
              color="teal"
              indeterminate
              size="64"
              class="d-flex justify-center my-6"
            />

            <!-- Tela de Sucesso -->
            <div v-if="paymentSuccess" class="text-center">
              <v-img
                alt="Pagamento realizado"
                class="mx-auto mb-4"
                contain
                max-width="100"
                src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              />
              <div class="text-h6 font-weight-medium">Pagamento gerado com sucesso!</div>
              <div class="text-body-2 mt-1">Em breve vamos verificar o seu pagamento.</div>
            </div>
          </v-card-text>


        </v-card>
      </v-dialog>

      <DialogView v-model="dialogVisible" max-width="500">
        <formCompleteProfile
          @error-form-students="errorFormStudentsCreate"
          @profile-complete-success="profileCompleteSuccess()"
        />
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
  import { onMounted, ref, watch } from 'vue';
  import formCompleteProfile from '../forms/formCompleteProfile.vue';
  import DialogView from '../dialog/DialogView.vue';
  import { useAuthStore } from '@/stores/auth.js';
  import { logout as logoutApi } from '@/services/auth';
  import {
    getAppointments as getAppointmentsAPI,
    getPayments as getPaymentsApi,
    handlePayment as handlePaymentAPI,
  } from '@/services/user';
  import { userUseStore } from '@/stores/user.js';

  const useStore = userUseStore();
  const router = useRouter();
  const store = useAuthStore();

  const dialogVisible = ref(false);
  const drawer = ref(false);
  const showPayments = ref(false);
  const theme = ref('light');
  const isProfileComplete = ref(false);
  const selectedPaymentMethod = ref(null);
  const paymentResult = ref(null);
  const snackBarMessage = ref('');
  const snackBarVisible = ref(false);
  const faltas = ref([]);
  const profileNavigation = ref({
    name: store.user?.name,
    greenting: 'Seja bem vindo(a)',
  });
  const rules = {
    required: value => !!value || 'Campo obrigatório',
    min: v => (v && v.length >= 3) || 'Mínimo de 3 caracteres',
    max: v => (v && v.length <= 10) || 'Máximo de 10 caracteres',
  };
  const paymentAmount = ref(null);
  const isProcessing = ref(false); // progress cicle, tem que ser ativado quando o pagamento for solicitado
  const paymentSuccess = ref(false); // mensagem de sucessso
  const shouldReloadPayments = ref(false); // reload da tela de pagamentos

  const ifCompleteProfile = computed(() => store.user?.CompleteStudentRecord);
  const userId = computed(() => store.user?.id);
  const notPayments = computed(() => useStore.errorMessagePayment);
  const dataPayments = computed(() => { return useStore.responseGetPayment });
  const errorMessagesOther = computed(() => useStore.errorMessageOther);
  const responseAppointmentsGet = computed(() => useStore.responseGetAppointments);

  onMounted(() => {
    getAppointmentsUser();
  });


  const paymentMethods = ref(['PIX', 'Boleto Bancário']);
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };
  const dialogsHome = async (item, type) => {
    isProfileComplete.value = true; // se for true o alert de complete sua conta sera aberto
    if (type === 'profileComplete') {
      dialogVisible.value = true;
    }
  };
  const generatePayment = async () => {
    isProcessing.value = true; // Ativa o loader de processamento
    try {
      const inputAmount = {
        amount: paymentAmount.value,
      }
      const response = await handlePaymentAPI(inputAmount)
      useStore.handlePayments(response)
      if (response.status !== '') {
        shouldReloadPayments.value = true
        isProcessing.value = false
        paymentMessageSuccess()
      }
    } catch (error) {
      console.log(error)
    }
  };
  const paymentMessageSuccess = () => {
    // isProcessing.value = false
    paymentSuccess.value = true
    paymentAmount.value = false
    selectedPaymentMethod.value = null
    setTimeout(() => {
      showPayments.value = false
      paymentSuccess.value = false
    }, 3000)

  }
  watch(shouldReloadPayments, val => {
    console.log(` shouldReloadPayments: ${val}`);
    if (val) {
      payments()
      shouldReloadPayments.value = false
    }
  })

  const profileCompleteSuccess = () => {
    snackBarVisible.value = true;
    dialogVisible.value = false;
    snackBarMessage.value = 'Cadastro completo com sucesso!';
    getAppointmentsUser()
  };

  const closePaymentsDialog = () => {
    showPayments.value = true;
    selectedPaymentMethod.value = null;
    paymentResult.value = null;
  };
  const errorFormStudentsCreate = status => {
    if (status !== 409) {
      snackBarVisible.value = true;
      snackBarMessage.value = 'Preencha todos os campos obrigatórios!';
    }
    if (status === 409) {
      dialogVisible.value = false;

      snackBarVisible.value = true;
      snackBarMessage.value = 'O Usuario já está com o perfil Completo.!';
      setTimeout(() => {
        handleLogout();
      }, 4000);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await logoutApi();

      store.logout(response);
      await router.push('/login');
    } catch (error) {
      console.error('Error ao fazer o Logout ', error);
    }
  };
  const payments = async () => {
    const id = userId.value;
    try {
      const response = await getPaymentsApi(id);
      useStore.payments(response.data);
    } catch (error) {
      const errorResponse = {
        message: error.response.data.message,
        status: error.response.status,
      };
      useStore.errorPayments(errorResponse);
    }
  };

  const getAppointmentsUser = async () => {
    try {
      const response = await getAppointmentsAPI();
      useStore.getAppointmentsStore(response)
    } catch (error) {
      const dataError = {
        message: error.response.data.message,
        status: error.response.status,
      }
      useStore.errorMessages(dataError)

    }
  };
  function toggleFalta(appointmentId, dayOfWeek) {
    const key = `${appointmentId}-${dayOfWeek}`
    const index = faltas.value.indexOf(key)
    if (index >= 0) {
      faltas.value.splice(index, 1)
    } else {
      faltas.value.push(key)
    }
  }

  function isAbsent(appointmentId, dayOfWeek) {
    return faltas.value.includes(`${appointmentId}-${dayOfWeek}`)
  }

  function formatTime(time) {
    return time.slice(0, 5)
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

</script>

<style scoped>
.v-parallax>div {
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 20px;
  border-radius: 12px;
}

.v-alert {
  cursor: pointer;
}



.toolbar-title-responsive {
  font-size: 1.25rem;
  transition: font-size 0.2s;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  text-align: left;
}

@media (max-width: 600px) {
  .toolbar-title-responsive {
    font-size: 1rem;
    text-align: left;
  }
}

@media (max-width: 500px) {
  .toolbar-title-responsive {
    font-size: 0.85rem;
    text-align: left;
  }
}

</style>
