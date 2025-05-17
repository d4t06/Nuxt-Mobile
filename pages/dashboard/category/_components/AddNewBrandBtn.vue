<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/16/solid";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import useBrandAction from "../_hooks/useBrandAction";

type Props = {
  currentCategory?: Category;
};

const props = defineProps<Props>();

const modalRef = ref<ModalRef | null>(null);

const { actions, isFetching } = useBrandAction();
</script>
<template>
  <Button :disabled="!props.currentCategory" :onclick="modalRef && modalRef.open">
    <PlusIcon class="w-6" />
    <span class="hidden sm:block">Add new brand</span>
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
            brand: {
              brand_name: v,
              brand_name_ascii: generateId(v),
              category_id: props.currentCategory!.id,
              image_url: '',
            },
          })
      "
      :loading="isFetching"
      title="Add new category"
    />
  </Modal>
</template>
