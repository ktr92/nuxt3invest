export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    APITOKEN: process.env.API_TOKEN,
    APIURL: process.env.API_URL,
  },
  typescript: {
    typeCheck: true,
  },
})
