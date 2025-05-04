import { defineStore } from "pinia";
import { useAuthStore } from '@/stores/auth';
import { handlePayment } from "@/services/user";

export const userUseStore = defineStore('user',{
  state:()=>({
    completeProfile:[],
    responseCadastro:[],
    responseGetPayment:[],
    errorMessagePayment:[],
    responsePaymentSuccess:[],

  }),
  getters:{

  },
  actions:{
    async completeProfileUser(response){
      try {
        this.completeProfile = response
        if(response.status === 201){
          const userLocalStorage = JSON.parse(localStorage.getItem('user'));
          userLocalStorage.CompleteStudentRecord = true
          localStorage.setItem('user', JSON.stringify(userLocalStorage)) // atualiza os dados do localStorage
          const useAuth = useAuthStore() // acessa o authStore
          useAuth.user = userLocalStorage // quando acessa o authStore, vai ate a variavel user para atualizar conforme o localStore
        }

      } catch (error) {
        console.log(error);

      }
    },
    async cadastroUser(response){
      try {
        this.responseCadastro = response
      } catch (error) {
        console.log(error);

      }
    },
    async payments(response){
      try {
        this.responseGetPayment = response
      } catch (error) {
        console.log(error)
      }
    },
    async errorPayments(response){
      try {
        this.errorMessagePayment = response
      } catch (error) {
        console.log(error)
      }
    },
    async handlePayments(response){
      try {
        // console.log(`Dados recebidos pela api ${response}`);

          this.responsePaymentSuccess = response
      } catch (error) {
        console.log(error);

      }
    }

  }
})


