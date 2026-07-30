import { ref } from "vue";
import { useProductContext } from "./productProvider";

export default function useProductDetail() {
  const {$api} = useNuxtApp();

  const { product } = useProductContext();

  const route = useRoute();

  const isFetching = ref(true);

  const fetchProduct = async () => {
    try {
      const res = await $api<Product>(
        `/products/${route.params["id"]}`,
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
