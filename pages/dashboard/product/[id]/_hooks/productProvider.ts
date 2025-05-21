import { inject, provide, ref } from "vue";

const useProduct = () => {
  const product = ref<Product>();

  return { product };
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
