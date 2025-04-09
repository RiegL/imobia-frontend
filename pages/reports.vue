<template>
    <v-container>
      <h1 class="text-h4 mb-4">Relatórios</h1>
      <v-list>
        <v-list-item to="/reports/income-stats">
          <v-list-item-title>Estatísticas de Renda</v-list-item-title>
        </v-list-item>
        <v-list-item to="/reports/clients-per-month">
          <v-list-item-title>Clientes por Mês</v-list-item-title>
        </v-list-item>
        <v-list-item to="/reports/clients-by-city">
          <v-list-item-title>Clientes por Cidade</v-list-item-title>
        </v-list-item>
        <v-list-item to="/reports/total-clients">
          <v-list-item-title>Total de Clientes</v-list-item-title>
        </v-list-item>
        <v-list-item to="/reports/company-types">
          <v-list-item-title>Clientes por Tipo de Empresa</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script setup>

  </script>
  