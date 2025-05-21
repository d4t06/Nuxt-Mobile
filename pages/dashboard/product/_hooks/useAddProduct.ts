import { useToastContext } from "~/stores/toastProvider";
import { useProductsContext } from "./productsProvider";

type Props = {
  closeModal?: () => void;
};

export default function useAddProduct({ closeModal }: Props) {
  //    hooks
  const { products } = useProductsContext();
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
    callback: () => void;
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

          props.callback();

          break;
        }
      }

      showToast(true, `${props.variant} product successful`);

      closeModal && closeModal();
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
