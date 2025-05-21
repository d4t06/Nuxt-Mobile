import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import { useToastContext } from "~/stores/toastProvider";
import { generateId } from "~/utils";

const CATEGORY_URL = "/categories";

type Props = {
  modalRef: Ref<ModalRef | null>;
};

export default function useCategoryAction({ modalRef }: Props) {
  const { categories } = useCategoryContext();
  const { showToast } = useToastContext();

  const fetch = usePrivateFetch();

  const isFetching = ref(false);

  // hooks

  type Add = {
    type: "Add";
    name: string;
  };

  type Edit = {
    type: "Edit";
    category: Partial<CategorySchema>;
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
          const CategorySchema: CategorySchema = {
            attribute_order: "",
            category_name: props.name,
            category_name_ascii: generateId(props.name),
          };
          await fetch<Category>(CATEGORY_URL, {
            method: "POST",
            body: CategorySchema,
          });

          break;
        case "Edit": {
          const { category, id } = props;

          await fetch(`${CATEGORY_URL}/${id}`, { body: category, method: "PUT" });

          break;
        }

        case "Delete": {
          await fetch(`${CATEGORY_URL}/${props.id}`, { method: "DELETE" });
          break;
        }
      }


      showToast(true, `${props.type} ok`)

      const res = await fetch<Category[]>("/categories");
      categories.value = res;
    } catch (error: any) {
      if (error.response.status === 409) {
        showToast(false, "Category name had taken");
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
