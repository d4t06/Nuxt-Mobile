<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import useSpectAction from "../_hooks/useSpecAction";

type Props = {
  attribute?: ProductAttribute;
  product: Product;
  categoryAttribute: CategoryAttribute;
};

const props = defineProps<Props>();

const modalRef = ref<ModalRef>();

const { action, isFetching } = useSpectAction({ modalRef });
</script>
<template>
  <Button :onClick="modalRef?.open" class="px-3 py-1" size="clear" colors="second">
    <PencilSquareIcon class="w-5" />
    <span class="hidden sm:block">Edit</span>
  </Button>

  <Modal ref="modalRef">
    <AddItemModal
      variant="text-are"
      :title="props.attribute ? 'Edit attribute' : 'Add Attribute'"
      :init-value="props.attribute?.value"
      :close-modal="modalRef?.close"
      :loading="isFetching"
      :submit="
        (v) =>
          !props.attribute
            ? action({
                variant: 'Add',
                productAttribute: {
                  product_id: props.product.id,
                  category_attribute_id: props.categoryAttribute.id,
                  value: v,
                },
              })
            : action({
                variant: 'Edit',
                id: props.attribute.id,
                productAttribute: {
                  value: v,
                },
              })
      "
    />
  </Modal>
</template>
