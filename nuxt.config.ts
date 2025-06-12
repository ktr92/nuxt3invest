export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@samk-dev/nuxt-vcalendar'],
  typescript: {
    typeCheck: true
  }
})
