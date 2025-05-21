import { ref, watchEffect } from "vue";
import { useProductsContext } from "./productsProvider";

const tabs = ["All", "Result"];

export default function useDashboardProduct() {
  const runtimeConfig = useRuntimeConfig();

  const { products, page, isFetching: isGetMoreFetching } = useProductsContext();

  const result = ref<Product[]>([]);
  const value = ref("");
  const tab = ref("All");
  const isFetching = ref(true);

  type Search = {
    variant: "search";
  };

  type GetProducts = {
    variant: "get-products";
  };

  const fetchProduct = async (props: Search | GetProducts) => {
    try {
      switch (props.variant) {
        case "search": {
          isFetching.value = true;

          const res = await $fetch<Product[]>(
            `${runtimeConfig.public.API_ENDPOINT}/products/search?q=${value.value}`,
          );

          result.value = res;
          tab.value = "Result";
          break;
        }
        case "get-products": {
          if (page.value > 1) isGetMoreFetching.value = true;

          const res = await $fetch<{ products: Product[] }>(
            `${runtimeConfig.public.API_ENDPOINT}/products?page=${page.value}`,
          );
          products.value.push(...res.products);

          break;
        }
      }
    } catch (err) {
      console.log({ message: err });
    } finally {
      isFetching.value = false;
      isGetMoreFetching.value = false;
    }
  };
  watchEffect(() => {
    if (tab.value !== "All") return;

    if (!products.value.length) fetchProduct({ variant: "get-products" });
    else {
      isFetching.value = false;
    }
  });

  return {
    isFetching,
    value,
    fetchProduct,
    tabs,
    tab,
    result,
  };
}
