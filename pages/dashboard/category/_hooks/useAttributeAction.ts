import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import { useToastContext } from "~/stores/toastProvider";

const ATTRIBUTE_ENDPOINT = "/category-attributes";

type Props = {
  modalRef: Ref<ModalRef | null>;
};

export default function useAttributeAction({ modalRef }: Props) {
  const { categories } = useCategoryContext();
  const { showToast } = useToastContext();

  const fetch = usePrivateFetch();
  const isFetching = ref(false);

  // hooks

  type Add = {
    type: "Add";
    attribute: CategoryAttributeSchema;
  };

  type Edit = {
    type: "Edit";
    attribute: Partial<CategoryAttributeSchema>;
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
          await fetch<Category>(ATTRIBUTE_ENDPOINT, {
            method: "POST",
            body: props.attribute,
          });

          break;
        case "Edit": {
          const { attribute, id } = props;
          await fetch(`${ATTRIBUTE_ENDPOINT}/${id}`, { body: attribute, method: "PUT" });
          break;
        }

        case "Delete": {
          await fetch(`${ATTRIBUTE_ENDPOINT}/${props.id}`);
          break;
        }
      }

      const res = await fetch<Category[]>("/categories");
      categories.value = res;
    } catch (error: any) {
      if (error.response.status === 409) {
        showToast(false, "Attribite name had taken");
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
