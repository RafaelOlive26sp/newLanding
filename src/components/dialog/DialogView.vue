<template>
  <v-dialog v-model="isOpen" :max-width="maxWidth" :persistent="persistent">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn text="Cancelar" @click="closeDialog"></v-btn> -->
        <v-btn v-if="confirmButtonText === 'Excluir'" color="primary" @click="confirmAction">
          {{ confirmButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { defineProps, defineEmits, ref, watch } from "vue";

  const props = defineProps({
    modelValue: Boolean, // Controle externo do dialog
    title: String, // Título do modal
    confirmButtonText: String, // Texto do botão de confirmação (opcional)
    persistent: String, // Se o modal deve ser persistente
    maxWidth:{
      default: 1000,
      type: Number,
    },
  });

  const emit = defineEmits(["update:modelValue", "confirm"]);

  const isOpen = ref(props.modelValue);

  // Atualiza quando a prop muda
  watch(() => props.modelValue, (newVal) => {
    isOpen.value = newVal;
  });


  watch(isOpen, (newVal) => {
    emit("update:modelValue", newVal);
  });

  const closeDialog = () => {
    emit("update:modelValue", false);
  };

  const confirmAction = () => {
    emit("confirm");
    closeDialog();
  };
</script>
