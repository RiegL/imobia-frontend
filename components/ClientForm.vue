<template>
    <v-dialog v-model="show" max-width="800">
      <v-card>
        <v-card-title class="text-h5">
          {{ isEdit ? 'Editar Cliente' : 'Novo Cliente' }}
        </v-card-title>
  
        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.name" label="Nome" :rules="[required]" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.email" label="Email" :rules="[required]" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.cpfCnpj" label="CPF/CNPJ" :rules="[required]" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.birthDate" label="Data de Nascimento" :rules="[required]" type="date" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.loginEmail" label="Login Email" :rules="[required]" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.companyType" label="Tipo de Empresa" :rules="[required]" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.incomeValue" label="Renda (R$)" :rules="[required]" type="number" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.mobilePhone" label="Telefone" :rules="[required]" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.address" label="Endereço" :rules="[required]" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.addressNumber" label="Número" :rules="[required]" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.province" label="Cidade" :rules="[required]" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="client.postalCode" label="CEP" :rules="[required]" />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="close">Cancelar</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click="submit">Salvar</v-btn>
        </v-card-actions>
      </v-card>
  
      <v-snackbar v-model="snackbar.show" :timeout="3000">
        {{ snackbar.message }}
      </v-snackbar>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, reactive, watch } from 'vue'
  
  const props = defineProps({
    modelValue: Boolean,
    initialData: Object,
    isEdit: Boolean
  })
  
  const emit = defineEmits(['update:modelValue', 'submit'])
  
  const show = ref(props.modelValue)
  const formValid = ref(false)
  const form = ref(null)
  const client = reactive({ ...props.initialData })
  
  const snackbar = reactive({
    show: false,
    message: ''
  })
  
  watch(() => props.modelValue, val => {
    show.value = val
    Object.assign(client, props.initialData)
  })
  
  const required = value => !!value || 'Campo obrigatório'
  
  const close = () => emit('update:modelValue', false)
  
  const submit = () => {
    if (form.value?.validate()) {
      emit('submit', { ...client })
      snackbar.message = props.isEdit ? 'Cliente atualizado!' : 'Cliente criado!'
      snackbar.show = true
      close()
    }
  }
  </script>
  