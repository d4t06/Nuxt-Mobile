=
<script setup lang="ts">
// import type { ModalRef } from "~/shares/components/modal/Modal.vue";

import useProductAction from "../_hooks/useProductAction";
import Editor from "./Editor.vue";
import { useProductContext } from "../_hooks/productProvider";
// import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
// import ModalWrapper from "~/shares/components/modal/ModalWrapper.vue";

const { action, isFetching } = useProductAction();
const { product } = useProductContext();

const isLock = ref(false);

const handleSubmit = async (v: string) => {
  if (!product.value) return;

  await action({
    variant: "edit-desc",
    desc: { content: v },
    productId: product.value?.id,
  });
};
</script>

<template>
  <!-- <Button colors="second" :onClick="modalRef?.open" size="clear" class="p-1.5">
    <Cog6ToothIcon class="w-6" />
  </Button> -->

  <!-- <Modal :wrapper="false" ref="modalRef"> -->
  <!-- <ModalWrapper :styled="false" className="w-[700px]"> -->

  <div class="flex justify-between items-center">
    <h1>Detail</h1>
    <button @click="isLock = !isLock">
      <img class="w-6" src="/icons/lock.png">
    </button>
  </div>

  <Editor
    :isDisable="isFetching || isLock"
    :content="product?.description.content"
    :submit="handleSubmit"
  />

  <!-- </ModalWrapper> -->
  <!-- </Modal> -->
</template>
