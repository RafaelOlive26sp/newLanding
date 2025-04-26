import { defineStore } from "pinia";

export const userUseStore = defineStore('user',{
  state:()=>{
    completeProfile:[]

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
    }
  }
})


