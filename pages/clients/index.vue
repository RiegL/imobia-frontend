<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Clientes</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="mt-10">
        <v-row justify="center">
          <v-col cols="12" md="10">
            <v-card class="pa-4" outlined>
              <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h6">Lista de Clientes</span>
                <v-btn color="primary" variant="flat" size="small" @click="openForm" prepend-icon="mdi-plus">
                  Novo Cliente
                </v-btn>
              </v-card-title>

              <v-card-text>
                <v-data-table :headers="headers" :items="clients" item-value="id" class="elevation-1"
                  no-data-text="Nenhum cliente encontrado">
                  <template #item.actions="{ item }">
                    <v-btn icon size="small" :to="`/clients/${item.id}`" title="Ver Detalhes">
                      <v-icon color="green">mdi-eye</v-icon>
                    </v-btn>
                    <v-btn icon size="small" @click="editClient(item)">
                      <v-icon color="blue">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon size="small" @click="confirmDelete(item)">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </template>

                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>


    <v-footer app color="primary" dark>
      <v-container class="text-center">
        <span>&copy; 2025 Imobia. Todos os direitos reservados.</span>
      </v-container>
    </v-footer>

    <ClientForm v-model="showForm" :initialData="selectedClient" :isEdit="!!selectedClient?.id"
      @submit="handleSubmit" />

    <ConfirmDeleteDialog v-model="showConfirm" @confirm="handleDelete" />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ClientForm from '@/components/ClientForm.vue'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue'

const clients = ref([])
const showForm = ref(false)
const showConfirm = ref(false)
const selectedClient = ref(null)

const headers = [
  { title: 'Nome', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Cidade', value: 'province' },
  { title: 'Ações', value: 'actions', sortable: false }
]

const fetchClients = async () => {
  const { data } = await axios.get('http://localhost:3333/clients')
  clients.value = data
}

const openForm = () => {
  selectedClient.value = {
    name: '', email: '', cpfCnpj: '', birthDate: '',
    loginEmail: '', companyType: '', incomeValue: '',
    address: '', addressNumber: '', province: '', postalCode: '',
    mobilePhone: ''
  }
  showForm.value = true
}

const editClient = (client) => {
  selectedClient.value = { ...client }
  showForm.value = true
}

const confirmDelete = (client) => {
  selectedClient.value = client
  showConfirm.value = true
}

const handleDelete = async () => {
  await axios.delete(`http://localhost:3333/clients/${selectedClient.value.id}`)
  await fetchClients()
}

const handleSubmit = async (client) => {
  if (client.id) {
    await axios.put(`http://localhost:3333/clients/${client.id}`, client)
  } else {
    await axios.post('http://localhost:3333/clients', client)
  }
  await fetchClients()
}

onMounted(fetchClients)
</script>
