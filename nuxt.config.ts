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
        { name: 'viewport', content: "width=device-width, initial-scale=1, user-scalable=no" },
        { name: 'description', content: "Explore limitless melodies with Vocol - Your go-to destination for seamless music streaming. Discover, listen, and enjoy an extensive collection of songs spanning various genres. Elevate your musical experience with Vocol today." }
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
