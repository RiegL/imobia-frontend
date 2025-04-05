# 🎨 Imobia - Front-end

Este é o front-end da aplicação **Imobia**, feito com [Nuxt 3](https://nuxt.com/) e [Vuetify](https://vuetifyjs.com/). Permite gerenciar clientes de forma intuitiva e visual.

---

## ⚙️ Funcionalidades

- ✅ Listagem de clientes
- ✅ Cadastro via modal com validações
- ✅ Atualização e exclusão de clientes
- ✅ Interface responsiva e moderna com Vuetify
- ✅ Feedback visual com Snackbars

---

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/imobia-frontend.git
cd imobia-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

---

## 🌐 Configuração da API

No arquivo `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3333' // Endereço do seu back-end
    }
  }
})
```

---

## 📁 Estrutura de Diretórios

- `pages/index.vue` – Página inicial
- `pages/clients.vue` – CRUD de clientes
- `components/ClientTable.vue` – Tabela de exibição
- `components/ClientForm.vue` – Formulário de cadastro/edição
- `components/ConfirmDelete.vue` – Modal de exclusão

---

## 💅 Tecnologias

- Vue 3 + Nuxt 3
- Vuetify
- Axios
- Vite
- Pinia (opcional para estado)

---

## 👨‍💻 Autor

Desenvolvido por [Seu Nome](https://github.com/seu-usuario)