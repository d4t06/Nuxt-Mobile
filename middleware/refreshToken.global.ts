export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();

  const config = useRuntimeConfig();

  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    await fetch(config.public.API_ENDPOINT + "/greeting");

    await sleep(1000);
  }
});
