<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Imobia Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="mt-10">
        <v-row dense class="mb-4" justify="center">
          <!-- Visão Geral -->

          <v-col class="d-flex justify-start mb-4" cols="12">
            <v-subheader class="text-h6">Visão Geral</v-subheader>
          </v-col>

          <!-- Total de Clientes centralizado -->
          <v-col cols="12" md="6" offset-md-4>
            <v-card class="pa-4" elevation="2" color="blue-grey-lighten-5">
              <v-card-title>
                <v-icon class="mr-2">mdi-account-group</v-icon>
                Total de Clientes
              </v-card-title>
              <v-card-text class="text-h4 text-center">
                {{ totalClients }}
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Clientes por Mês -->
          <v-col cols="12" md="6">
            <v-card class="pa-4" elevation="2" color="blue-grey-lighten-5">
              <v-card-title>
                <v-icon class="mr-2">mdi-calendar-month</v-icon>
                Clientes por Mês
              </v-card-title>
              <div style="height: 250px; display: flex; align-items: center; justify-content: center;">
                <BarChart v-if="monthlyChartData" :chartData="monthlyChartData" :chartOptions="barOptions" />
                <v-progress-circular v-else indeterminate color="primary" />
              </div>
            </v-card>
          </v-col>

          <v-divider class="my-6" />

          <!-- Detalhes Demográficos -->
          <v-col cols="12">
            <v-subheader class="text-h6">Distribuição de Clientes</v-subheader>
          </v-col>


          <!-- Média de Renda -->
          <v-col cols="12" md="6">
            <v-card class="pa-4" elevation="2" color="blue-grey-lighten-5">
              <v-card-title>
                <v-icon class="mr-2">mdi-cash-multiple</v-icon>
                Média de Renda
              </v-card-title>
              <div style="height: 250px; display: flex; align-items: center; justify-content: center;">
                <BarChart v-if="incomeChartData" :chartData="incomeChartData" :chartOptions="barOptions" />
                <v-progress-circular v-else indeterminate color="primary" />
              </div>
            </v-card>
          </v-col>

          <!-- Clientes por Cidade -->
          <v-col cols="12" md="6">
            <v-card class="pa-4" elevation="2" color="blue-grey-lighten-5">
              <v-card-title>
                <v-icon class="mr-2">mdi-map-marker</v-icon>
                Clientes por Cidade
              </v-card-title>
              <div style="height: 250px; display: flex; align-items: center; justify-content: center;">
                <PieChart v-if="cityChartData" :chartData="cityChartData" :chartOptions="pieOptions" />
                <v-progress-circular v-else indeterminate color="primary" />
              </div>
            </v-card>
          </v-col>


          <v-divider class="my-6" />


          <!-- Coluna com duas Ações Rápidas embaixo uma da outra -->
          <v-col cols="12" md="6">
            <v-row dense>

              <v-col cols="12">
                <v-card class="pa-4" elevation="2" color="blue-grey-lighten-5">
                  <v-card-title class="d-flex align-center">
                    <v-icon class="mr-2">mdi-cash-multiple</v-icon>
                    Maior Renda Registrada
                  </v-card-title>
                  <v-card-text class="text-h5 font-weight-bold text-center">
                    {{ maxIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                  </v-card-text>
                </v-card>
              </v-col>


              <v-col cols="12">
                <v-card class="pa-4" elevation="2" color="blue-grey-lighten-5">
                  <v-card-title class="d-flex justify-space-between align-center">
                    <div>
                      <v-icon class="mr-2">mdi-rocket-launch</v-icon>
                      Ações Rápidas
                    </div>
                    <v-btn color="primary" to="/clients">Ver Clientes</v-btn>
                  </v-card-title>
                  <v-card-text>
                    Gerencie, edite e cadastre novos clientes com facilidade.
                  </v-card-text>
                </v-card>
              </v-col>

            </v-row>
          </v-col>
          <!-- Tipos de Empresa -->
          <v-col cols="12" md="6">
            <v-card class="pa-4" elevation="2" color="blue-grey-lighten-5">
              <v-card-title>
                <v-icon class="mr-2">mdi-domain</v-icon>
                Tipos de Empresa
              </v-card-title>
              <div style="height: 250px; display: flex; align-items: center; justify-content: center;">
                <PieChart v-if="companyChartData" :chartData="companyChartData" :chartOptions="pieOptions" />
                <v-progress-circular v-else indeterminate color="primary" />
              </div>
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
  </v-app>
</template>




<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BarChart from '~/components/BarChart.vue'
import PieChart from '~/components/PieChart.vue'

const totalClients = ref(0)
const incomeChartData = ref(null)
const monthlyChartData = ref(null)
const cityChartData = ref(null)
const companyChartData = ref(null)
const maxIncome = ref(0)  // Nova variável para maior renda

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false }
  }
}

const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: false }
  }
}

const fetchData = async () => {
  try {
    const [
      totalRes,
      incomeRes,
      monthRes,
      cityRes,
      companyRes
    ] = await Promise.all([
      axios.get('http://localhost:3333/clients/report/total-clients'),
      axios.get('http://localhost:3333/clients/report/income-stats'),
      axios.get('http://localhost:3333/clients/report/clients-per-month'),
      axios.get('http://localhost:3333/clients/report/clients-by-city'),
      axios.get('http://localhost:3333/clients/report/company-types')
    ])

    // Total de clientes
    totalClients.value = totalRes.data.total || 0

    // Média de renda e maior renda
    const incomeStats = incomeRes.data.averageIncome || {}
    const avgIncome = incomeStats.averageIncome || 0
    maxIncome.value = incomeStats.maxIncome || 0

    incomeChartData.value = {
      labels: ['Média de Renda'],
      datasets: [
        {
          label: 'R$',
          data: [avgIncome],
          backgroundColor: '#3f51b5'
        }
      ]
    }

    // Clientes por mês
    monthlyChartData.value = {
      labels: monthRes.data.map(item => {
        const [year, month] = item.month.split('-')
        return `${month}/${year.slice(2)}`
      }),
      datasets: [
        {
          label: 'Clientes por Mês',
          data: monthRes.data.map(item => item.total),
          backgroundColor: '#4caf50'
        }
      ]
    }

    // Clientes por cidade
    cityChartData.value = {
      labels: cityRes.data.map(item => item.city),
      datasets: [
        {
          label: 'Clientes por Cidade',
          data: cityRes.data.map(item => item.total),
          backgroundColor: ['#2196f3', '#ff9800', '#4caf50', '#f44336']
        }
      ]
    }

    // Tipos de empresa
    const companyData = companyRes.data
    companyChartData.value = {
      labels: Object.keys(companyData),
      datasets: [
        {
          label: 'Tipos de Empresa',
          data: Object.values(companyData),
          backgroundColor: ['#9c27b0', '#00bcd4', '#ffeb3b']
        }
      ]
    }
  } catch (err) {
    console.error('Erro ao buscar dados:', err)
  }
}

onMounted(fetchData)
</script>
