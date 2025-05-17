import { inject, provide, ref } from "vue";

const useCategory = () => {
  const categories = ref<Category[]>([]);
  const isFetching = ref(true);

  return { categories, isFetching };
};

type ContextType = ReturnType<typeof useCategory>;

export default function categoryProvider() {
  const state = useCategory();

  provide("category_context", state);

  return state;
}

export function useCategoryContext() {
  const state = inject<ContextType>("category_context")!;
  if (!state) throw new Error("CategoryProvider not provided");

  return state;
}
