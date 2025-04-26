<template>
  <v-card>
    <v-card-title class="text-h6 teal--text text--darken-1">
      Ficha de Aluno
    </v-card-title>


    <v-card-text>

        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field v-model="profile.age" label="Idade" type="number" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="profile.height" label="Altura (cm)" type="number" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="profile.weight" label="Peso (kg)" type="number" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-select v-model="profile.gender" label="Gênero" :items="itemGender" item-title="text" item-value="value"  outlined
          dense></v-select>
        <v-radio-group v-model="profile.smoker" label="Fuma?">
          <v-radio label="Sim" value="1"></v-radio>
          <v-radio label="Não" value="0"></v-radio>
        </v-radio-group>
        <v-radio-group v-model="profile.previous_experience" label="Praticou exercícios físicos nos últimos 6 meses?">
          <v-radio label="Sim" value="1"></v-radio>
          <v-radio label="Não" value="0"></v-radio>
        </v-radio-group>
        <v-radio-group v-model="profile.currently_praticing" label="Pratica exercícios atualmente?">
          <v-radio label="Sim" value="1"></v-radio>
          <v-radio label="Não" value="0"></v-radio>
        </v-radio-group>
        <v-textarea v-model="profile.medical_condition" label="Recomendações Médicas" outlined dense
          rows="2"></v-textarea>

    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal-darken-1" dark type="submit" @click="profileComplete">Concluir</v-btn>
    </v-card-actions>

  </v-card>
</template>


<script setup>
  import { ref} from 'vue';
  import {completeUser as completeUserApi} from '@/services/user'
  import { userUseStore } from '@/stores/user'

  const emit = defineEmits(['profileComplete'])
  const userStore = userUseStore()
  const profile = ref({

    Age: "",
    height: "",
    weight: "",
    gender: "",
    smoker: " ",
    medical_condition: "",
    previous_experience: "",
    currently_praticing: "",
  })
  const itemGender = ref([
    {text:'Masculino', value:'male'},
    {text:'Feminino', value:'female'}
  ])

  const profileComplete = async () => {

    const dataForm = {

      age: profile.value.age,
      height: profile.value.height,
      weight: profile.value.weight,
      gender: profile.value.gender,
      smoker: profile.value.smoker,
      medical_condition: profile.value.medical_condition,
      previous_experience: profile.value.previous_experience,
      currently_praticing: profile.value.currently_praticing,
    }


    // console.log(dataForm);



    try {
      const response = await completeUserApi(dataForm)
      userStore.completeProfileUser(response)
      if (response.status === 201) {
        // emit('profileComplete')
        console.log(response.status);

      }

    } catch (error) {
      console.log(error);

    }
  }


</script>
