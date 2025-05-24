import { inject, provide, ref } from "vue";

const useCurrentCategory = () => {
  const category = ref<Category>();
  const index = ref<number>();

  return { category, index };
};

type ContextType = ReturnType<typeof useCurrentCategory>;

export default function currentCategoryProvider() {
  const state = useCurrentCategory();

  provide("current_category_context", state);

  return state;
}

export function useCurrentCategoryContext() {
  const state = inject<ContextType>("current_category_context")!;
  if (!state) throw new Error("currentCategoryProvider not provided");

  return state;
}
