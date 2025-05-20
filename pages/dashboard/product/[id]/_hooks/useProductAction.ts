import { useToastContext } from "~/stores/toastProvider";

export default function useProductAction() {
  const config = useRuntimeConfig();

  const isFetching = ref(false);

  const privateRequest = usePrivateFetch();
  const { showToast } = useToastContext();

  const END_POINT = config.public.API_ENDPOINT + "/products";

  type Delete = {
    variant: "delete";
    id: number;
  };

  const action = async (props: Delete) => {
    try {
      isFetching.value = true;

      switch (props.variant) {
        case "delete":
          await privateRequest(END_POINT + `/${props.id}`);
      }

      showToast(true);
    } catch (error) {
      showToast(false);
    } finally {
      isFetching.value = false;
    }
  };

  return { action };
}
