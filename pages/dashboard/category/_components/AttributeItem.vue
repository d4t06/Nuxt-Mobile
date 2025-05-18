<script setup lang="ts">
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import useAttributeAction from "../_hooks/useAttributeAction";

type Props = {
  attribute: CategoryAttribute;
};

defineProps<Props>();

type Modal = "edit" | "delete";

const modalRef = ref<ModalRef | null>(null);
const modal = ref<Modal | "">("");

const { actions, isFetching } = useAttributeAction({ modalRef });

const openModal = (m: Modal) => {
  modal.value = m;
  modalRef.value?.open();
};
</script>

<template>
  <ItemRightCtaFrame>
    <span>{{ attribute.attribute_name }}</span>

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
        :submit="() => actions({ type: 'Delete', id: attribute.id })"
      />

      <AddItemModal
        v-if="modal === 'edit'"
        variant="input"
        title="Edit category"
        :loading="isFetching"
        :initValue="attribute.attribute_name"
        :closeModal="modalRef?.close"
        :submit="
          (v) =>
            actions({
              type: 'Edit',
              attribute: { attribute_name: v, attribute_name_ascii: generateId(v) },
              id: attribute.id,
            })
        "
      />
    </Modal>
  </ItemRightCtaFrame>
</template>
