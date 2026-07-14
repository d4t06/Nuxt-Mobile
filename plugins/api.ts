export default defineNuxtPlugin(() => {

   const config = useRuntimeConfig()

   const api = $fetch.create({
      baseURL: config.public.API_ENDPOINT,
      onRequest() {
      },
      async onResponseError({ response }) {
         if (response.status === 401) {
         }
      },
   });

   // Expose to useNuxtApp().$api
   return {
      provide: {
         api,
      },
   };
});
