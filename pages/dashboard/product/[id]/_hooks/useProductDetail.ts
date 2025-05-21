import { ref } from "vue";
import { useProductContext } from "./productProvider";

export default function useProductDetail() {
  const runtimeConfig = useRuntimeConfig();

  const { product } = useProductContext();

  const route = useRoute();

  const isFetching = ref(true);

  const fetchProduct = async () => {
    try {
      const res = await $fetch<Product>(
        `${runtimeConfig.public.API_ENDPOINT}/products/${route.params["id"]}`,
      );

      product.value = res;
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
