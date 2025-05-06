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
        <v-list-item @click="(showAppointments = !showAppointments), getAppointmentsUser()">
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
        <v-icon>{{
          theme === "light" ? "mdi-weather-night" : "mdi-white-balance-sunny"
        }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <!-- Profile Incomplete Alert -->
      <v-alert v-if="!ifCompleteProfile" class="ma-4" clickable color="amber-darken-2" type="warning"
        @click="dialogsHome(item, 'profileComplete')">
        Complete seu cadastro aqui!
      </v-alert>

      <!-- Parallax Header -->
      <v-parallax height="350"
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1470&q=80">
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
          <div v-if="showAppointments">
            <h2 class="text-h5 teal--text text--darken-1 mb-4">
              Meus Agendamentos
            </h2>
            <prev>

              <!-- {{ responseAppointments.data }} -->
            </prev>
            <!-- {{ responseAppointments.message }} -->
            <v-alert  v-if="responseAppointments.status === 404" border="top"  type="warning" variant="outlined" prominent >
              {{ responseAppointments.message }}
            </v-alert>
            <v-row v-else>
              <v-col v-for="(appointment, i) in responseAppointments[0].classe.schedules_patterns" :key="i" cols="12" md="4" sm="6">
                <v-card class="pa-4" color="grey-lighten-4" elevation="2" rounded="lg">
                  <pre>

                    <!-- {{responseAppointments[0].classe.schedules_patterns}} -->
                  </pre>
                  <v-card-title class="text-h6 teal--text text--darken-1">
                    <v-icon color="teal" left>mdi-calendar</v-icon>
                    {{ appointment.date }}
                  </v-card-title>
                  <v-card-text>
                    <p class="mb-1">
                      <v-icon color="teal" left small>mdi-clock-outline</v-icon>
                      <strong>Horário:</strong> {{ appointment }}
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


          <v-card-text>
            <!-- Lista de Pagamentos Pendentes -->
            <!-- {{useStore.responseGetPayment.data}} -->
            <!-- {{ dataPayments }} -->
            <v-list v-if="notPayments.status !== ''" class="mb-4">
              <v-list-item v-for="(payment, i) in dataPayments" :key="i">
                <v-list-item-content>
                  <v-list-item-title>
                    Pagamento #{{ i + 1 }} - R$ {{ payment.amount }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Vencimento: {{ payment.due_date }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Status: <span class="text-yellow-darken-3 text-overline font-weight-black">{{ payment.status }}
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <!-- Mensagem de Nenhum Pagamento -->
            <v-alert v-else class="mb-4" color="teal-lighten-3" type="info">
              {{ notPayments.message }}
            </v-alert>

            <!-- Seleção do Método de Pagamento -->
            <v-select v-model="selectedPaymentMethod" class="mb-4" dense :items="paymentMethods"
              v-if="!isProcessing && notPayments.status === ''" label="Método de Pagamento" outlined />

            <!-- Campo de Valor do Pagamento -->
            <v-text-field v-if="selectedPaymentMethod == 'PIX'" outlined v-model="paymentAmount" class="mb-4" dense
              label="Valor do Pagamento" prefix="R$" type="number" :rules="[rules.required, rules.min]" />

            <!-- Loader de Processamento do pagamento -->

            <div class="d-flex justify-center my-6" v-if="isProcessing">
              <v-progress-circular indeterminate color="teal" size="64" />
            </div>

            <!-- Tela de Sucesso do pagamento -->

            <div class="text-center" v-if="paymentSuccess">
              <v-img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Pagamento realizado" contain
                max-width="100" class="mx-auto mb-4" />
              <div class="text-h6 font-weight-medium">
                Pagamento gerado com sucesso!
              </div>
              <div class="text-body-2 mt-1">
                Em breve vamos verificar o seu pagamento.
              </div>
            </div>


          </v-card-text>

          <v-card-actions v-if="paymentSuccess.value">
            <v-spacer />
            <v-btn :color="selectedPaymentMethod === 'PIX'
              ? 'teal-darken-1'
              : 'teal-darken-1'
              " dark :disabled="!selectedPaymentMethod || !paymentAmount" @click="generatePayment">
              {{
                selectedPaymentMethod === "PIX"
                  ? "Gerar QR Code PIX"
                  : "Gerar Boleto"
              }}
            </v-btn>
            <v-btn text @click="closePaymentsDialog">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <DialogView v-model="dialogVisible" max-width="500">
        <formCompleteProfile @error-form-students="errorFormStudentsCreate"
          @profile-complete-success="profileCompleteSuccess()" />
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

import { useRouter } from "vue-router";
import { ref } from "vue";
import formCompleteProfile from "../forms/formCompleteProfile.vue";
import DialogView from "../dialog/DialogView.vue";
import { useAuthStore } from "@/stores/auth.js";
import { logout as logoutApi } from "@/services/auth";
import {
  getPayments as getPaymentsApi,
  handlePayment as handlePaymentAPI,
  getAppointments as getAppointmentsAPI,
} from "@/services/user";
import { userUseStore } from "@/stores/user.js";

const useStore = userUseStore();
const router = useRouter();
const store = useAuthStore();

const dialogVisible = ref(false);
const drawer = ref(false);
const showPayments = ref(false);
const showAppointments = ref(false);
const theme = ref("light");
const isProfileComplete = ref(false);
const selectedPaymentMethod = ref(null);
const paymentResult = ref(null);
const snackBarMessage = ref("");
const snackBarVisible = ref(false);
const profileNavigation = ref({
  name: store.user?.name,
  greenting: "Seja bem vindo(a)",
});
const rules = {
  required: (value) => !!value || "Campo obrigatório",
  min: (v) => (v && v.length >= 3) || "Mínimo de 3 caracteres",
  max: (v) => (v && v.length <= 10) || "Máximo de 10 caracteres",
};
const paymentAmount = ref(null);
const isProcessing = ref(false); // progress cicle, tem que ser ativado quando o pagamento for solicitado
const paymentSuccess = ref(false); // mensagem de sucessso
const datasPayments = ref({})


const ifCompleteProfile = computed(() => store.user?.CompleteStudentRecord);
const userId = computed(() => store.user?.id);
const notPayments = computed(() => useStore.errorMessagePayment);
const dataPayments = computed(() => { return useStore.responseGetPayment });
const errorMessages = computed(() => useStore.errorMessages);
const responseAppointments = computed(() => useStore.responseGetAppointments.data);

const appointments = ref([
  {
    date: "Segunda-feira",
    time: "07:00 às 08:00",
    group: "turma 1",
    level: "beginner",
  },
  {
    date: "Quarta-feira",
    time: "16:00 às 17:00",
    group: "turma 1",
    level: "beginner",
  },
  {
    date: "Sexta-feira",
    time: "20:00 às 21:00",
    group: "turma 1",
    level: "beginner",
  },
]);

const paymentMethods = ref(["PIX", "Boleto Bancário"]);

const pendingPayments = ref([
  { amount: "150,00", dueDate: "30/04/2025" },
  { amount: "150,00", dueDate: "30/05/2025" },
]);

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};
const dialogsHome = async (item, type) => {
  isProfileComplete.value = true; // se for true o alert de complete sua conta sera aberto
  if (type === "profileComplete") {
    dialogVisible.value = true;
  }
};
const generatePayment = async () => {
  isProcessing.value = true; // Ativa o loader de processamento
  if (isProcessing.value) {
    selectedPaymentMethod.value = null;
  }
  try {
    // console.log(paymentAmount.value);
    const inputAmount = {
      amount: paymentAmount.value,
    }

    const response = await handlePaymentAPI(inputAmount)
    // console.log('resposta da api ',response)
    useStore.handlePayments(response)
    if (response.status !== '') {
      paymentMessageSuccess()
    }
  } catch (error) {
    console.log(error)
  }
};
const paymentMessageSuccess = () => {
  isProcessing.value = false
  paymentSuccess.value = true
  setTimeout(() => {
    showPayments.value = false
  }, 3000)
}

const profileCompleteSuccess = () => {
  snackBarVisible.value = true;
  dialogVisible.value = false;
  snackBarMessage.value = "Cadastro completo com sucesso!";
};

const closePaymentsDialog = () => {
  showPayments.value = true;
  selectedPaymentMethod.value = null;
  paymentResult.value = null;
};
const errorFormStudentsCreate = (status) => {
  if (status !== 409) {
    snackBarVisible.value = true;
    snackBarMessage.value = "Preencha todos os campos obrigatórios!";
  }
  if (status === 409) {
    dialogVisible.value = false;

    snackBarVisible.value = true;
    snackBarMessage.value = "O Usuario já está com o perfil Completo.!";
    setTimeout(() => {
      handleLogout();
    }, 4000);
  }
};
const handleLogout = async () => {
  try {
    const response = await logoutApi();

    store.logout(response);
    await router.push("/login");
  } catch (error) {
    console.error("Error ao fazer o Logout ", error);
  }
};
const payments = async () => {
  const id = userId.value;
  // console.log('id', id);
  // Recupera os pagamentos
  try {
    const response = await getPaymentsApi(id);
    // console.log("Pagamentos:", response);
    useStore.payments(response.data);
  } catch (error) {
    // console.error("Erro ao buscar pagamentos:", error.response.data.message);
    const errorResponse = {
      message: error.response.data.message,
      status: error.response.status,
    };
    // console.log(errorResponse);
    useStore.errorPayments(errorResponse);
  }
};

const getAppointmentsUser = async () => {
  // const id = userId.value;
  try {
    const response = await getAppointmentsAPI();
    // console.log("Agendamentos: estamos na landingPage ", response.data);
    useStore.getAppointmentsStore(response)
  } catch (error) {
    // console.error("Erro ao buscar agendamentos:", error.response.data.message);
    const dataError = {
      message: error.response.data.message,
      status: error.response.status,
    }
    // console.log(' estamos na landing ',dataError);
    useStore.getAppointmentsStore(dataError)

  }
};
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
</style>
