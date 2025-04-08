<template>
  <v-data-table :headers="headers" :items="clients" item-value="id" class="elevation-1">
    <template #top>
  <div class="d-flex justify-center mb-4">
    <v-btn
      color="primary"
      variant="flat"
      size="small"
      @click="openForm"
      prepend-icon="mdi-plus"
    >
      Novo Cliente
    </v-btn>
  </div>
</template>
    <template #item.actions="{ item }">
  <v-btn icon size="small" @click="editClient(item)">
    <v-icon color="blue">mdi-pencil</v-icon>
  </v-btn>
  <v-btn icon size="small" @click="confirmDelete(item)">
    <v-icon color="red">mdi-delete</v-icon>
  </v-btn>
</template>
  </v-data-table>

  <ClientForm v-model="showForm" :initialData="selectedClient" :isEdit="!!selectedClient?.id" @submit="handleSubmit" />

  <ConfirmDeleteDialog v-model="showConfirm" @confirm="handleDelete" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ClientForm from './ClientForm.vue'
import ConfirmDeleteDialog from './ConfirmDeleteDialog.vue'

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