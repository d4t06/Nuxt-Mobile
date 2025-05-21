<script setup lang="ts">
import { ArrowTopRightOnSquareIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import AddProductModal from "../../_components/AddProductModal.vue";
import { useProductContext } from "../_hooks/productProvider";

const modalRef = ref<ModalRef>();

const { product } = useProductContext();

const afterSubmit = (data: Partial<ProductSchema>) => {
  if (!product.value) return;

  Object.assign(product.value, data);
};
</script>

<template>
  <div class="space-x-2">
    <NuxtLink target="_blank" :href="`/product/${product?.id}`">
      <Button colors="second" size="clear" class-name="p-1.5">
        <ArrowTopRightOnSquareIcon class="w-6" />
      </Button>
    </NuxtLink>
    <Button colors="second" :onClick="modalRef?.open" size="clear" class-name="p-1.5">
      <Cog6ToothIcon class="w-6" />
    </Button>
  </div>

  <Modal v-if="product" ref="modalRef">
    <AddProductModal
      type="Edit"
      :close-modal="modalRef?.close"
      title="Edit product"
      :product="product"
      :callback="afterSubmit"
    />
  </Modal>
</template>
