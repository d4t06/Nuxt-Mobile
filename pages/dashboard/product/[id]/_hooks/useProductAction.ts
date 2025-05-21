import { useToastContext } from "~/stores/toastProvider";

export default function useProductAction() {
  const config = useRuntimeConfig();

  const isFetching = ref(false);

  const privateRequest = usePrivateFetch();
  const { showToast } = useToastContext();

  const BASE_END_POINT = config.public.API_ENDPOINT;

  type Delete = {
    variant: "delete";
    id: number;
  };

  type EditDesc = {
    variant: "edit-desc";
    productId: number;
    desc: Partial<DescriptionSchema>;
    callback?: () => void;
  };

  const action = async (props: Delete | EditDesc) => {
    try {
      isFetching.value = true;

      switch (props.variant) {
        case "delete":
          await privateRequest(BASE_END_POINT + `/products/${props.id}`, {
            method: "DELETE",
          });

          showToast(true, "Delete product ok");

          navigateTo("/dashboard/product");

          break;
        case "edit-desc":
          await privateRequest(
            BASE_END_POINT + `/product-descriptions/${props.productId}`,
            {
              method: "PUT",
              body: props.desc,
            },
          );

          props.callback && props.callback();

          showToast(true, "Update description ok");
          break;
      }
    } catch (error) {
      showToast(false);
    } finally {
      isFetching.value = false;
    }
  };

  return { action, isFetching };
}
