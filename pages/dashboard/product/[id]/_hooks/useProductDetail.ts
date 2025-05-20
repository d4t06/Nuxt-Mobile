import { ref, watchEffect } from "vue";

export default function useProductDetail() {
  const runtimeConfig = useRuntimeConfig();

  const route = useRoute();

  const product = ref<Product>();
  const isFetching = ref(true);

  const fetchProduct = async () => {
    try {
      const res = await $fetch<{ products: Product[] }>(
        `${runtimeConfig.public.API_ENDPOINT}/products/${route.params["id"]}`,
      );
    } catch (err) {
      console.log({ message: err });
    } finally {
      isFetching.value = false;
    }
  };

  return {
    isFetching,
    fetchProduct,
    product,
  };
}
