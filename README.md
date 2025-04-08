
# 💻 Imobia Dashboard - Frontend (Nuxt 3 + Vuetify)

Este é o frontend da aplicação **Imobia**, desenvolvido com Nuxt 3, Vue 3 e Vuetify. Ele fornece uma dashboard visual para gerenciar clientes e visualizar dados e gráficos em tempo real.

---

## 🌟 Funcionalidades

- Tela de Dashboard com gráficos:
  - Total de Clientes
  - Clientes por Mês (BarChart)
  - Média de Renda (BarChart)
  - Clientes por Cidade (PieChart)
  - Tipos de Empresa (PieChart)
- CRUD completo de clientes
- Modais para criação/edição de cliente
- Validações e feedback visual (snackbars)
- Estilo limpo e responsivo com Vuetify

---

## 📁 Estrutura

- `components/BarChart.vue` e `PieChart.vue`: gráficos com Chart.js
- `pages/index.vue`: dashboard com cards e gráficos
- `pages/clients.vue`: listagem, criação e edição de clientes
- `components/ClientForm.vue`: formulário reutilizável
- `services/patientService.ts`: comunicação com a API

---

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Rodar localmente
npm run dev
```

> 💡 Certifique-se de que o backend esteja rodando em `http://localhost:3333`

---

## 🔌 Comunicação com a API

O front consome diretamente as rotas do backend para buscar os dados dos relatórios e do CRUD de clientes.

---

## ✨ Extras

- Layout com Vuetify (cards, ícones, feedback visual)
- Responsividade garantida (flex/grid do Vuetify)
