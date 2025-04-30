import { defineStore } from "pinia";

export const userUseStore = defineStore('user',{
  state:()=>{
    completeProfile:[]
    responseCadastro:[]

  },
  getters:{

  },
  actions:{
    async completeProfileUser(response){
      try {
        this.completeProfile = response
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


