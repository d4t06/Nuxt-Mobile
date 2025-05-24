import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import { useToastContext } from "~/stores/toastProvider";
import { useCurrentCategoryContext } from "./currentCategoryProvider";

const ATTRIBUTE_ENDPOINT = "/category-attributes";

type Props = {
  modalRef: Ref<ModalRef | null>;
};

export default function useAttributeAction({ modalRef }: Props) {
  const { categories } = useCategoryContext();
  const { index } = useCurrentCategoryContext();
  const { showToast } = useToastContext();

  const privatefetch = usePrivateFetch();
  const isFetching = ref(false);

  // hooks

  type Add = {
    type: "Add";
    attribute: CategoryAttributeSchema;
    categoryId: number;
  };

  type Edit = {
    type: "Edit";
    attribute: Partial<CategoryAttributeSchema>;
    id: number;
    index: number;
  };

  type Delete = {
    type: "Delete";
    id: number;
    categoryId: number;
    index: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    try {
      if (index.value === undefined) return;

      isFetching.value = true;
      const idList: number[] = [];

      switch (props.type) {
        case "Add":
        case "Delete":
          const attrItems = document.querySelectorAll(".attribute-item");
          if (attrItems) {
            attrItems.forEach((item) =>
              idList.push(+(item.getAttribute("data-id") as string)),
            );
          }

          break;
      }

      switch (props.type) {
        case "Add":
          const res = await privatefetch<CategoryAttribute>(ATTRIBUTE_ENDPOINT, {
            method: "POST",
            body: props.attribute,
          });
          idList.push(res.id);

          categories.value[index.value].attributes.push(res);

          break;
        case "Edit": {
          const { attribute, id } = props;
          await privatefetch(`${ATTRIBUTE_ENDPOINT}/${id}`, {
            body: attribute,
            method: "PUT",
          });

          Object.assign(categories.value[index.value].attributes[props.index], attribute);

          break;
        }

        case "Delete": {
          await privatefetch(`${ATTRIBUTE_ENDPOINT}/${props.id}`, { method: "DELETE" });

          (() => {
            const index = idList.findIndex((id) => id === props.id);
            if (index !== -1) idList.splice(index, 1);
          })();

          // cause flash render
          // categories.value[index.value].attributes.splice(props.index, 1);

          break;
        }
      }

      // update category attribute order
      switch (props.type) {
        case "Add":
        case "Delete":
          const payload: Partial<CategorySchema> = { attribute_order: idList.join("_") };

          await privatefetch(`/categories/${props.categoryId}`, {
            method: "PUT",
            body: payload,
          });

          Object.assign(categories.value[index.value], payload);

          if (props.type === "Delete")
            categories.value[index.value].attributes.splice(props.index, 1);

          break;
      }

      showToast(true, `${props.type} ok`);
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
