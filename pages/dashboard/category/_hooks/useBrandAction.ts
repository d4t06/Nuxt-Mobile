import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import { useToastContext } from "~/stores/toastProvider";

const CATEGORY_URL = "/brands";

type Props = {
  modalRef: Ref<ModalRef | null>;
};

export default function useBrandAction({ modalRef }: Props) {
  const { categories } = useCategoryContext();
  const { showToast } = useToastContext();

  const fetch = usePrivateFetch();
  const isFetching = ref(false);

  // hooks

  type Add = {
    type: "Add";
    brand: BrandSchema;
  };

  type Edit = {
    type: "Edit";
    brand: Partial<BrandSchema>;
    id: number;
  };

  type Delete = {
    type: "Delete";
    id: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    try {
      isFetching.value = true;

      switch (props.type) {
        case "Add":
          await fetch<Category>(CATEGORY_URL, {
            method: "POST",
            body: props.brand,
          });

          break;
        case "Edit": {
          const { brand, id } = props;
          await fetch(`${CATEGORY_URL}/${id}`, { body: brand, method: "PUT" });
          break;
        }

        case "Delete": {
          await fetch(`${CATEGORY_URL}/${props.id}`, { method: "DELETE" });
          break;
        }
      }

      showToast(true, `${props.type} ok`);

      const res = await fetch<Category[]>("/categories");
      categories.value = res;
    } catch (error: any) {
      if (error.response.status === 409) {
        showToast(false, "Brand name had taken");
      } else {
        showToast(false);
      }
    } finally {
      isFetching.value = false;
      modalRef.value?.close();
    }
  };

  return { isFetching, actions };
}
