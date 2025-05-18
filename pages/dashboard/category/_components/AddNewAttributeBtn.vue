<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/16/solid";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import useAttributeAction from "../_hooks/useAttributeAction";

type Props = {
  currentCategory?: Category;
};

const props = defineProps<Props>();

const modalRef = ref<ModalRef | null>(null);

const { actions, isFetching } = useAttributeAction({modalRef});
</script>
<template>
  <Button :disabled="!props.currentCategory" :onclick="modalRef && modalRef.open">
    <PlusIcon class="w-6" />
    <span class="hidden sm:block">Add new attribute</span>
  </Button>

  <Modal ref="modalRef">
    <AddItemModal
      v-if="props.currentCategory"
      variant="input"
      :closeModal="modalRef!.close"
      :submit="
        (v) =>
          actions({
            type: 'Add',
            attribute: {
              attribute_name: v,
              attribute_name_ascii: generateId(v),
              category_id: props.currentCategory!.id,
            },
          })
      "
      :loading="isFetching"
      title="Add new attribute"
    />
  </Modal>
</template>
