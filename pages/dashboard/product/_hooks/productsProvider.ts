import { inject, provide, ref } from "vue";

const useProduct = () => {
  const products = ref<Product[]>([]);
  const isFetching = ref(false);
  const page = ref<number>(1);

  return { products, isFetching, page };
};

type ContextType = ReturnType<typeof useProduct>;

export default function productsProvider() {
  const state = useProduct();

  provide("products_context", state);

  return state;
}

export function useProductsContext() {
  const state = inject<ContextType>("products_context")!;
  if (!state) throw new Error("productProvider not provided");

  return state;
}
