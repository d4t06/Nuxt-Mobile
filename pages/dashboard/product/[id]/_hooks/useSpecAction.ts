import { useToastContext } from "~/stores/toastProvider";
import { useProductContext } from "./productProvider";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";

type Props = {
  modalRef: Ref<ModalRef | undefined>;
};

export default function useSpectAction({ modalRef }: Props) {
  const config = useRuntimeConfig();
  const { product } = useProductContext();

  const isFetching = ref(false);

  const privateRequest = usePrivateFetch();
  const { showToast } = useToastContext();

  const END_POINT = config.public.API_ENDPOINT + "/product-attributes";

  type AddAttribute = {
    variant: "Add";
    productAttribute: ProductAttributeSchema;
  };

  type EditAttribute = {
    variant: "Edit";
    productAttribute: Partial<ProductAttributeSchema>;
    id: number;
  };

  const action = async (props: AddAttribute | EditAttribute) => {
    try {
      if (!product.value) return;
      isFetching.value = true;

      switch (props.variant) {
        case "Add":
          const res = await privateRequest<ProductAttribute>(`${END_POINT}`, {
            body: props.productAttribute,
            method: "POST",
          });

          product.value.attributes.push(res);

          break;

        case "Edit":
          await privateRequest(`${END_POINT}/${props.id}`, {
            body: props.productAttribute,
            method: "PUT",
          });

          const index = product.value.attributes.findIndex((att) => att.id === props.id);
          if (index !== -1)
            Object.assign(product.value.attributes[index], props.productAttribute);
      }

      showToast(true, `${props.variant} attribute successful`);
    } catch (error) {
      showToast(false);
    } finally {
      isFetching.value = false;
      modalRef.value?.close();
    }
  };

  return { action, isFetching };
}
