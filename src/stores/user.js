import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
// import { getAppointments, handlePayment } from "@/services/user";

export const userUseStore = defineStore("user", {
  state: () => ({
    completeProfile: [],
    responseCadastro: [],
    responseGetPayment: {},
    errorMessagePayment: [],
    responsePaymentSuccess: [],
    errorMessageOther: [],
    responseGetAppointments: [],
  }),
  getters: {},
  actions: {
    async completeProfileUser(response) {
      this.completeProfile = response;
      if (response.status === 201) {
        const userLocalStorage = JSON.parse(localStorage.getItem("user"));
        userLocalStorage.CompleteStudentRecord = true;
        localStorage.setItem("user", JSON.stringify(userLocalStorage)); // atualiza os dados do localStorage
        const useAuth = useAuthStore(); // acessa o authStore
        useAuth.user = userLocalStorage; // quando acessa o authStore, vai ate a variavel user para atualizar conforme o localStore
      }
    },
    async cadastroUser(response) {
      this.responseCadastro = response;
    },
    async payments(response) {
      this.responseGetPayment = response;
      this.errorMessagePayment = [];
    },
    async errorPayments(response) {
      this.errorMessagePayment = response;
    },
    async handlePayments(response) {
      this.responsePaymentSuccess = response;
    },
    async getAppointmentsStore(response) {
      this.responseGetAppointments = response;
    },
    async errorMessages(response) {
      this.errorMessageOther = response;
    },
  },
});
