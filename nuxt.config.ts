export default defineNuxtConfig({
  app: {
    head: {
      title: "Imobia",
      meta: [
        {
          name: "description",
          content: "Gerenciamento de clientes com ASAAS e relatórios",
        },
      ],
    },
  },
  css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.css"],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  compatibilityDate: "2025-04-07",
});
