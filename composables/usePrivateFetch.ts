export default function usePrivateFetch() {
  const { data: sesstion } = useAuth();
  const config = useRuntimeConfig();

  const request = $fetch.create({
    baseURL: config.public.API_ENDPOINT,
    headers: { Authorization: `Bearer ${sesstion.value?.token}` },
  });

  return request;
}
