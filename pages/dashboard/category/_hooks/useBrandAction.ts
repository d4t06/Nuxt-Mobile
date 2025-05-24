import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import { useToastContext } from "~/stores/toastProvider";
import { useCurrentCategoryContext } from "./currentCategoryProvider";

const CATEGORY_URL = "/brands";

type Props = {
  modalRef: Ref<ModalRef | null>;
};

export default function useBrandAction({ modalRef }: Props) {
  const { categories } = useCategoryContext();
  const { index } = useCurrentCategoryContext();
  const { showToast } = useToastContext();

  const privateFetch = usePrivateFetch();
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
    index: number;
  };

  type Delete = {
    type: "Delete";
    id: number;
    index: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    try {
      if (index.value === undefined) return;

      isFetching.value = true;

      switch (props.type) {
        case "Add":
          const res = await privateFetch<Brand>(CATEGORY_URL, {
            method: "POST",
            body: props.brand,
          });

          categories.value[index.value].brands.push(res);

          break;

        case "Edit": {
          const { brand, id } = props;
          await privateFetch(`${CATEGORY_URL}/${id}`, { body: brand, method: "PUT" });

          Object.assign(categories.value[index.value].brands[props.index], brand);

          break;
        }

        case "Delete": {
          await privateFetch(`${CATEGORY_URL}/${props.id}`, { method: "DELETE" });

          categories.value[index.value].brands.splice(props.index, 1);

          break;
        }
      }

      showToast(true, `${props.type} ok`);

      // const res = await privateFetch<Category[]>("/categories");
      // categories.value = res;
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
