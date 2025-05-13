export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: false },

  components: {
    dirs: ["~/components", "~/shares/components"],
  },
  // global css
  css: ["./global.css"],
  // apply taiwind css
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // app title
  app: {
    head: {
      title: "Nuxt Mobile",
    },
  },

  // env variables
  runtimeConfig: {
    public: {
      API_ENDPOINT:
        process.env.NUXT_PUBLIC_API_BASE ||
        "https://nest-mobile.vercel.app/api",
    },
  },

  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: ["400..700"],
        },
      },
    ],
  ],

  // define modules
  // modules: ["@sidebase/nuxt-auth"],
});
