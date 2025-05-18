<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/16/solid";
import useCategoryAction from "../_hooks/useCategoryAction";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";

const modalRef = ref<ModalRef | null>(null);

const { actions, isFetching } = useCategoryAction({modalRef});
</script>
<template>
  <Button :onclick="modalRef && modalRef.open">
    <PlusIcon class="w-6" />
    <span class="hidden sm:block">Add new category</span>
  </Button>

  <Modal ref="modalRef">
    <AddItemModal
      variant="input"
      :closeModal="modalRef!.close"
      :submit="(v) => actions({ type: 'Add', name: v })"
      :loading="isFetching"
      title="Add new category"
    />
  </Modal>
</template>
