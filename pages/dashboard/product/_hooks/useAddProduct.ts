import { useToastContext } from "~/stores/toastProvider";
import { useProductContext } from "./productProvider";

export default function useAddProduct() {
  //    hooks
  const { products } = useProductContext();
  const { showToast } = useToastContext();

  const privateRequest = usePrivateFetch();
  const config = useRuntimeConfig();

  const isFetching = ref(false);

  const PRODUCT_URL = config.public.API_ENDPOINT + "/products";

  type Add = {
    variant: "Add";
    product: ProductSchema;
  };

  type Edit = {
    variant: "Edit";
    product: Partial<ProductSchema>;
    id: number;
  };

  const addProduct = async (props: Add | Edit) => {
    try {
      isFetching.value = true;

      switch (props.variant) {
        case "Add": {
          const res = await privateRequest<Product>(`${PRODUCT_URL}`, {
            body: props.product,
            method: "POST",
          });

          products.value.unshift(res);

          break;
        }
        case "Edit": {
          const { product, id } = props;
          await privateRequest(`${PRODUCT_URL}/${id}`, { body: product, method: "PUT" });

          break;
        }
      }

      showToast(true, `${props.variant} product successful`);
    } catch (error: any) {
      if (error.response.status === 409) {
        showToast(false, "Product name had taken");
      } else showToast(false);
    } finally {
      isFetching.value = false;
    }
  };

  return { isFetching, addProduct };
}
