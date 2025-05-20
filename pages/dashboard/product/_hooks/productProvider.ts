import { inject, provide, ref } from "vue";

const useProduct = () => {
  const products = ref<Product[]>([]);
  const isFetching = ref(false);
  const page = ref<number>(1);

  return { products, isFetching, page };
};

type ContextType = ReturnType<typeof useProduct>;

export default function productProvider() {
  const state = useProduct();

  provide("product_context", state);

  return state;
}

export function useProductContext() {
  const state = inject<ContextType>("product_context")!;
  if (!state) throw new Error("productProvider not provided");

  return state;
}
