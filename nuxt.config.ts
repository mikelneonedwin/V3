// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }]
  ],
  app: {
    head: {
      title: 'V3',
      link: [
        { rel: 'stylesheet', href: '/css/google-font.css' }
      ],
      meta: [
        { name: 'viewport', content: "width=device-width, initial-scale=1, user-scalable=no" }
      ]
    }
  },
  imports: {
    presets: [
      { from: 'pinia', imports: ['storeToRefs', 'useStore'] }
    ],
    dirs: ['stores']
  }
})
