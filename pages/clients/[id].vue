<template>
    <v-app>
      <!-- cabeçalho -->
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Clientes</v-toolbar-title>
      </v-app-bar>
  
      <!-- conteúdo principal -->
      <v-main>
        <v-container class="py-8">
          <v-card v-if="client" class="pa-6" elevation="3">
            <v-card-title class="text-h6 mb-4">
              <v-icon class="mr-2">mdi-account-circle</v-icon>
              Detalhes do Cliente
            </v-card-title>
  
            <v-row dense>
              <v-col cols="12" md="6" v-for="(value, key) in client" :key="key">
                <strong>{{ formatLabel(key) }}:</strong> {{ value || '—' }}
              </v-col>
            </v-row>
  
            <v-card-actions class="mt-6">
              <v-btn color="primary" @click="goBack" prepend-icon="mdi-arrow-left">
                Voltar
              </v-btn>
            </v-card-actions>
          </v-card>
  
          <div v-else class="text-center">
            <v-progress-circular indeterminate color="primary" size="40" />
          </div>
        </v-container>
      </v-main>
  
      <!-- rodape -->
      <v-footer app color="primary" dark>
        <v-container class="text-center">
          <span>&copy; 2025 Imobia. Todos os direitos reservados.</span>
        </v-container>
      </v-footer>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const router = useRouter()
  const client = ref(null)
  
  const fetchClient = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3333/clients/${route.params.id}`)
      client.value = data
    } catch (err) {
      console.error('Erro ao buscar cliente:', err)
    }
  }
  
  const goBack = () => {
    router.back()
  }
  
  const formatLabel = (key) => {
    const map = {
      name: 'Nome',
      email: 'Email',
      cpfCnpj: 'CPF/CNPJ',
      birthDate: 'Data de Nascimento',
      loginEmail: 'Email de Login',
      companyType: 'Tipo de Empresa',
      incomeValue: 'Renda',
      address: 'Endereço',
      addressNumber: 'Número',
      province: 'Cidade',
      postalCode: 'CEP',
      mobilePhone: 'Celular',
      asaasAccountId: 'ID ASAAS'
    }
    return map[key] || key
  }
  
  onMounted(fetchClient)
  </script>
  