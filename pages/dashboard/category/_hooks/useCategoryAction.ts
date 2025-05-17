import { useCategoryContext } from "~/stores/categoryProvider";
import { useToastContext } from "~/stores/toastProvider";
import { generateId } from "~/utils";

const CATEGORY_URL = "/categories";

export default function useCategoryAction() {
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
    name: string;
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
          const res = await fetch<Category>(CATEGORY_URL, {
            method: "POST",
            body: CategorySchema,
          });

          categories.value.push(res);

          break;
        case "Edit": {
          const { name, id } = props;

          const data: Partial<CategorySchema> = {
            category_name: name,
            category_name_ascii: generateId(name),
          };

          await fetch(`${CATEGORY_URL}/${id}`, { body: data, method: "PUT" });

          break;
        }

        case "Delete": {
          await fetch(`${CATEGORY_URL}/${props.id}`);

          const newCategories = categories.value.filter((c) => c.id !== props.id);

          categories.value = newCategories;
        }
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        showToast(false, "Category name had taken");
      } else {
        showToast(false);
      }
    } finally {
      isFetching.value = false;
    }
  };

  return { isFetching, actions };
}
