export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();

  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    console.log("test gobal middleware"); // await sleep(1000);
  }
});
