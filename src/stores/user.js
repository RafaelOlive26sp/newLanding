import { defineStore } from "pinia";
import { useAuthStore } from '@/stores/auth';

export const userUseStore = defineStore('user',{
  state:()=>({
    completeProfile:[],
    responseCadastro:[],

  }),
  getters:{

  },
  actions:{
    async completeProfileUser(response){
      try {
        this.completeProfile = response
        console.log('response do completeProfile',this.completeProfile);
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
    }
  }
})


