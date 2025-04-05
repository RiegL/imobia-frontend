<template>
    <v-dialog v-model="model" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirmar exclusão</v-card-title>
        <v-card-text>Tem certeza que deseja excluir este cliente?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="cancel">Cancelar</v-btn>
          <v-btn color="red" variant="text" @click="confirm">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue', 'confirm'])
  
  const model = ref(props.modelValue)
  
  watch(() => props.modelValue, val => model.value = val)
  
  const cancel = () => emit('update:modelValue', false)
  const confirm = () => {
    emit('confirm')
    emit('update:modelValue', false)
  }
  </script>
  