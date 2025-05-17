import { useCategoryContext } from "~/stores/categoryProvider";
import { useToastContext } from "~/stores/toastProvider";

const CATEGORY_URL = "/brands";

export default function useBrandAction() {
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
          await fetch(`${CATEGORY_URL}/${props.id}`);
          break;
        }
      }

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
    }
  };

  return { isFetching, actions };
}
