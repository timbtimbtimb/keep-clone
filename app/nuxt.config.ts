// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@nuxtjs/google-fonts', {
        families: {
          "Open Sans": true,
        }
      }
    ]
  ],
  app: {
    head: {
      title: "Keep",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png"
        }
      ]
    }
  }
})