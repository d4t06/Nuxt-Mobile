<script setup lang="ts">
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import useCategoryAction from "../_hooks/useCategoryAction";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";

type Props = {
  category: Category;
  index: number;
};

const props = defineProps<Props>();

type Modal = "edit" | "delete";

const modalRef = ref<ModalRef | null>(null);
const modal = ref<Modal | "">("");

const { actions, isFetching } = useCategoryAction({ modalRef });

const openModal = (m: Modal) => {
  modal.value = m;
  modalRef.value?.open();
};
</script>

<template>
  <ItemRightCtaFrame>
    <span>{{ props.category.category_name }}</span>

    <div>
      <button @click="openModal('edit')">
        <PencilIcon class="w-5" />
      </button>
      <button @click="openModal('delete')">
        <TrashIcon class="w-5" />
      </button>
    </div>

    <Modal ref="modalRef">
      <ConfirmModal
        v-if="modal === 'delete'"
        :loading="isFetching"
        :closeModal="modalRef?.close"
        :submit="() => actions({ type: 'Delete', id: props.category.id })"
      />

      <AddItemModal
        v-if="modal === 'edit'"
        variant="input"
        title="Edit category"
        :loading="isFetching"
        :initValue="category.category_name"
        :closeModal="modalRef?.close"
        :submit="
          (v) =>
            actions({
              type: 'Edit',
              category: { category_name: v, category_name_ascii: generateId(v) },
              id: props.category.id,
              index: props.index,
            })
        "
      />
    </Modal>
  </ItemRightCtaFrame>
</template>
