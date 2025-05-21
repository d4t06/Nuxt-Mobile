<script setup lang="ts">
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import useProductAction from "../_hooks/useProductAction";

type Props = {
  product: Product;
};

const props = defineProps<Props>();

const modalRef = ref<ModalRef>();

const { action, isFetching } = useProductAction();
</script>
<template>

<div class="p-5 rounded-lg border border-red-500">

  <Button :onClick="modalRef?.open">Delete</Button>
  <Modal ref="modalRef">
    <ConfirmModal
      :loading="isFetching"
      :closeModal="modalRef?.close"
      :submit="() => action({ variant: 'delete', id: props.product.id })"
    />
  </Modal>
</div>

</template>
