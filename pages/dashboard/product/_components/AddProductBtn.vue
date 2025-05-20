<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";
import AddProductModal from "./AddProductModal.vue";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";

const modalRef = ref<ModalRef>();
</script>

<template>
  <Button :onClick="modalRef?.open" size="clear" className="p-1 px-3">
    <PlusIcon class="w-6" />
    <span class="hidden sm:block">Add product</span>
  </Button>

  <Modal ref="modalRef">
    <AddProductModal title="Add new product" type="Add" :closeModal="modalRef?.close" />
  </Modal>
</template>
