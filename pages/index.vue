<template>
    <v-app>
      <!-- Cabeçalho -->
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Imobia Dashboard</v-toolbar-title>
      </v-app-bar>
  
      <!-- Conteúdo principal -->
      <v-main>
        <v-container class="mt-10">
          <v-row>
            <!-- Card de Clientes -->
            <v-col cols="12" md="4">
              <v-card class="pa-4" outlined>
                <v-card-title>Clientes</v-card-title>
                <v-card-text>
                  Gerencie seus clientes cadastrados, crie, edite e delete informações.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" to="/clients">Ver Clientes</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
  
            <!-- Card de Relatórios -->
            <v-col cols="12" md="4">
              <v-card class="pa-4" outlined>
                <v-card-title>Relatórios</v-card-title>
                <v-card-text>
                  Veja gráficos e insights dos seus clientes.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" to="/reports">Ver Relatórios</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
  
            <!-- Card de Perfil -->
            <v-col cols="12" md="4">
              <v-card class="pa-4" outlined>
                <v-card-title>Perfil</v-card-title>
                <v-card-text>
                  Confira suas informações e configurações pessoais.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" to="/profile">Meu Perfil</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
  
      <!-- Rodapé -->
      <v-footer app color="primary" dark>
        <v-container class="text-center">
          <span>&copy; 2025 Imobia. Todos os direitos reservados.</span>
        </v-container>
      </v-footer>
    </v-app>
  </template>
  
  <script setup>
  // Aqui você pode adicionar lógica se precisar
  </script>
  