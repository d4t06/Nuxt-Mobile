import { ref, watchEffect } from "vue";

const tabs = ["All", "Result"];

export default function useDashboardProduct() {
  const runtimeConfig = useRuntimeConfig();

  const products = ref<Product[]>([]);

  const value = ref("");
  const isFetching = ref(true);
  const tab = ref("All");

  type Search = {
    variant: "search";
  };

  type GetProducts = {
    variant: "get-products";
  };

  const fetchProduct = async (props: Search | GetProducts) => {
    try {
      isFetching.value = true;

      switch (props.variant) {
        case "search": {
          const res = await $fetch<Product[]>(
            `${runtimeConfig.public.API_ENDPOINT}/products/search?q=${value.value}`,
          );

          products.value = res;
          tab.value = "Result";
          break;
        }
        case "get-products": {
          const res = await $fetch<{ products: Product[] }>(
            `${runtimeConfig.public.API_ENDPOINT}/products`,
          );
          products.value = res.products;

          break;
        }
      }
    } catch (err) {
      console.log({ message: err });
    } finally {
      isFetching.value = false;
    }
  };

  watchEffect(() => {
    if (tab.value !== "All") return;

    fetchProduct({ variant: "get-products" });
  });

  return {
    isFetching,
    value,
    fetchProduct,
    tabs,
    products,
    tab,
  };
}
