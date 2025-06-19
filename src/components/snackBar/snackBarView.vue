<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar" timeout="7000">
      {{ textContent }}
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>


<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    textContent:{
      type: String,
      default: 'Hello, I am a snackbar'
    },
    modelValue:{
      type: Boolean,
      required: true

    }
  })

  defineEmits(["update:modelValue"]);
  const snackbar = ref(props.modelValue)

  watch(()=>props.modelValue,(newValue)=>{
    snackbar.value = newValue
  })
  // const text = ref(`Hello, I'm a snackbar`)

</script>
