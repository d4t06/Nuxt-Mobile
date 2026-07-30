import { useToastContext } from "~/stores/toastProvider";
import { useProductContext } from "./productProvider";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";

// type Props = {
//   modalRef: Ref<ModalRef | undefined>;
// };

export default function useSpectAction() {
  const config = useRuntimeConfig();
  const { product } = useProductContext();

  const isFetching = ref(false);

  const privateRequest = usePrivateFetch();
  const { showToast } = useToastContext();

  const END_POINT = config.public.API_ENDPOINT + "/product-attributes";

  type Props = {
    variant: "Add";
    productAttributes: ProductAttributeSchema[];
  };

  // type EditAttribute = {
  //   variant: "Edit";
  //   productAttribute: Partial<ProductAttributeSchema>;
  //   id: number;
  // };

  const action = async (props: Props) => {
    try {
      if (!product.value) return;
      isFetching.value = true;

      const res = await privateRequest<ProductAttribute>(`${END_POINT}`, {
        body: props.productAttributes,
        method: "PUT",
      });

      product.value.attributes.push(res);

      // switch (props.variant) {
      //   case "Add":
      //     const res = await privateRequest<ProductAttribute>(`${END_POINT}`, {
      //       body: [props.productAttribute],
      //       method: "POST",
      //     });

      //     product.value.attributes.push(res);

      //     b

      //   case "Edit":
      //     await privateRequest(`${END_POINT}/${props.id}`, {
      //       body: props.productAttribute,
      //       method: "PUT",
      //     });

      //     const index = product.value.attributes.findIndex((att) => att.id === props.id);
      //     if (index !== -1)
      //       Object.assign(product.value.attributes[index], props.productAttribute);
      // }

      showToast(true, `Update attribute successful`);
    } catch (error) {
      showToast(false);
    } finally {
      isFetching.value = false;
      // modalRef.value?.close();
    }
  };

  return { action, isFetching };
}
