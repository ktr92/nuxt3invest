export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    TOKEN: process.env.TBTOKEN,
    APIURL: process.env.API_URL,
  },
  typescript: {
    typeCheck: true,
  },
})
