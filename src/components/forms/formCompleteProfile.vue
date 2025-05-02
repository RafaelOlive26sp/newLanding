<template>
  <v-card>
    <v-card-title class="text-h6 teal--text text--darken-1">
      Ficha de Aluno
    </v-card-title>


    <v-card-text>

      <v-row>
        <v-col cols="12" sm="4" >
          <v-text-field
            :rules="[rules.required, rules.number]"
            v-model="profile.age"
            dense
            label="Idade"
            outlined
            type="number"

          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field

            v-model="profile.height"
            dense
            label="Altura (cm)"
            outlined
            type="number"
            :rules="[rules.required, rules.number]"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            :rules="[rules.required, rules.number]"
            v-model="profile.weight"
            dense
            label="Peso (kg)"
            outlined
            type="number"
          />
        </v-col>
      </v-row>
      <v-select
        :rules="[rules.required]"
        v-model="profile.gender"
        item-title="text"
        item-value="value"
        dense
        :items="itemGender"
        label="Gênero"
        outlined
      />
      <v-radio-group v-model="profile.smoker" label="Fuma?" :rules="[rules.required]">
        <v-radio label="Sim" value="1" />
        <v-radio label="Não" value="0" />
      </v-radio-group>
      <v-radio-group v-model="profile.previous_experience" label="Praticou exercícios físicos nos últimos 6 meses?" :rules="[rules.required]">
        <v-radio label="Sim" value="1" />
        <v-radio label="Não" value="0" />
      </v-radio-group>
      <v-radio-group v-model="profile.currently_praticing" label="Pratica exercícios atualmente?" :rules="[rules.required]">
        <v-radio label="Sim" value="1" />
        <v-radio label="Não" value="0" />
      </v-radio-group>
      <v-textarea
        v-model="profile.medical_condition"
        dense
        label="Recomendações Médicas"
        outlined
        rows="2"
        :rules="[rules.min, rules.max, rules.noSpecialChars]"
      />

    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="teal-darken-1" dark type="submit" @click="profileComplete">Concluir</v-btn>
    </v-card-actions>

  </v-card>
  <snack-bar-view />
</template>


<script setup>
  import { ref } from 'vue';
  import { completeUser as completeUserApi } from '@/services/user'
  import { userUseStore } from '@/stores/user'
  import snackBarView from '@/components/snackBar/snackBarView.vue'


  const emit = defineEmits(['profileCompleteSuccess', 'errorFormStudents'])
  const userStore = userUseStore()
  const profile = ref({

    Age: '',
    height: '',
    weight: '',
    gender: '',
    smoker: ' ',
    medical_condition: '',
    previous_experience: '',
    currently_praticing: '',
  })
  const itemGender = ref([
    { text:'Masculino', value:'male' },
    { text:'Feminino', value:'female' },
  ])
 const rules = {
    required: value => !!value || 'Campo obrigatório',
    min: v => v?.length >= 3 || 'Mínimo de 3 caracteres',
    max: v => v?.length <= 20 || 'Máximo de 20 caracteres',
    number: v => !isNaN(v) || 'Número inválido',
    noSpecialChars: v => /^[a-zA-Z0-9 ]*$/.test(v) || 'Caracteres especiais não são permitidos',
  };

  const profileComplete = async () => {

    const dataForm = {

      age: profile.value.age,
      height: (profile.value.height / 100).toFixed(2),
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
        emit('profileCompleteSuccess')
      }

    } catch (error) {
      if (error.response.data.status !== 409) {
        emit('errorFormStudents', error.response.status)
        return
      }
      emit('errorFormStudents', error.response.status)
    }
  }


</script>
