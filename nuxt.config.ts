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
    "@sidebase/nuxt-auth",
  ],
  auth: {
    // globalAppMiddleware: true,
    isEnabled: true,
    baseURL:
      (process.env.AUTH_URL || "https://nest-mobile.vercel.app/api") + "/auth",
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        signUp: { path: "/register", method: "post" },
        getSession: { path: "/user-info", method: "get" },
      },
      session: {
        dataType: {
          username: "string",
          role: "string;",
        },
      },
      token: {
        signInResponseTokenPointer: "/token",
        // >>> Commented codes below are default
        // httpOnlyCookieAttribute: false,
        // cookieName: "auth.token",
        // type: "Bearer",
        // maxAgeInSeconds: 1800,
        // headerName: "Authorization",
        // sameSiteAttribute: "lax",
        // cookieDomain: "",
        // secureCookieAttribute: false,
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: "/refresh", method: "post" },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: "/refresh_token",
          // If not set, token.signInResponseTokenPointer will be used instead.
          refreshResponseTokenPointer: "/token",
          // How the JSON look like when send to server ex: {"refresh_token": "asdasd"}
          refreshRequestTokenPointer: "/refresh_token",
          cookieName: "auth.refresh-token",

          // >>> Commented codes below are default
          // httpOnlyCookieAttribute: flase,
          // maxAgeInSeconds: 1800,
          // sameSiteAttribute: "lax",
          // secureCookieAttribute: false,
          // cookieDomain: "",
        },
      },
      pages: {
        login: "/login",
      },
    },
  },
});
