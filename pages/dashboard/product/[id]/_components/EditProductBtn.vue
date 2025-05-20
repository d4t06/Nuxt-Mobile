<script setup lang="ts">
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import AddProductModal from "~/components/AddProductModal.vue";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";

const modalRef = ref<ModalRef>();
</script>

<template>
  <Button :onClick="modalRef?.open" size="clear" class-name="p-1.5">
    <Cog6ToothIcon class="w-6" />
  </Button>

  <Modal ref="modalRef">
    <AddProductModal />
  </Modal>
</template>
