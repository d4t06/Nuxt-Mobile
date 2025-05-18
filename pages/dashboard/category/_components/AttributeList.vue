<script setup lang="ts">
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import AddNewAttributeBtn from "./AddNewAttributeBtn.vue";
import AttributeItem from "./AttributeItem.vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import ChangeAttributeOrderBtn from "./ChangeAttributeOrderBtn.vue";

type Modal = "Add";

const { categories } = useCategoryContext();

const curCategoryIndex = ref<number>();

const modalRef = ref<ModalRef>();
const modal = ref<Modal | "">("");

const currentCategory = computed(() =>
  curCategoryIndex.value != undefined
    ? categories.value[curCategoryIndex.value]
    : undefined,
);

const attributeOrder = computed(() =>
  currentCategory.value?.attribute_order
    ? currentCategory.value?.attribute_order.split("_")
    : [],
);

const attributeByCategory = computed(() =>
  currentCategory.value ? currentCategory.value.attributes : [],
);

const orderedAttribute = computed(() =>
  attributeOrder.value.map((id) =>
    attributeByCategory.value.find((att) => att.id === +id),
  ),
);
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
          v-model="curCategoryIndex"
        >
          <option :value="undefined">---</option>
          <option v-for="(cat, index) in categories" :value="index">
            {{ cat.category_name }}
          </option>
        </select>
      </div>
    </div>

    <AddNewAttributeBtn :currentCategory="currentCategory" />
  </div>

  <template v-if="orderedAttribute.length">
    <div class="flex flex-wrap -mx-2 mt-3">
      <template v-for="attribute in orderedAttribute">
        <AttributeItem v-if="attribute" :attribute="attribute" />
        <div v-else>wrong index</div>
      </template>
    </div>

    <div v-if="currentCategory" class="mt-5">
      <ChangeAttributeOrderBtn
        :currentCategory="currentCategory"
      />
    </div>
  </template>
  <NotFound v-else />
</template>
