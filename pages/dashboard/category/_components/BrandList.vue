<script setup lang="ts">
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import AddNewBrandBtn from "./AddNewBrandBtn.vue";
type Modal = "add";

const { categories } = useCategoryContext();

const curCategoryIndex = ref<number>();

const modalRef = ref<ModalRef>();
const modal = ref<Modal | "">("");

const currentCategory = computed(() =>
  curCategoryIndex.value != undefined
    ? categories.value[curCategoryIndex.value]
    : undefined,
);

const brandByCategory = computed(() =>
  currentCategory.value ? currentCategory.value.brands : [],
);

const openModal = (m: Modal) => {
  modal.value = m;
  modalRef.value?.open();
};
</script>
<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-[10px]">
      <p class="{classes.label}">Category:</p>
      <div class="bg-[#ccc] rounded-[12px]">
        <select
          :disabled="!categories.length"
          class="min-w-[100px] my-input"
          name="category"
          @change="console.log('change')"
        >
          <option :value="undefined">---</option>
          <option v-for="(cat, index) in categories" :value="index">
            {{ cat.category_name }}
          </option>
        </select>
      </div>
    </div>

    <AddNewBrandBtn :currentCategory="currentCategory" />
  </div>
</template>
