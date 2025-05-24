<script setup lang="ts">
import { useCategoryContext } from "~/stores/categoryProvider";
import AddNewAttributeBtn from "./AddNewAttributeBtn.vue";
import AttributeItem from "./AttributeItem.vue";
import ChangeAttributeOrderBtn from "./ChangeAttributeOrderBtn.vue";
import { useCurrentCategoryContext } from "../_hooks/currentCategoryProvider";
import { atRule } from "postcss";

const { categories } = useCategoryContext();
const { category, index } = useCurrentCategoryContext();

const attributeOrder = computed(() =>
  category.value?.attribute_order ? category.value?.attribute_order.split("_") : [],
);

const attributeByCategory = computed(() =>
  category.value ? category.value.attributes : [],
);

const orderedAttribute = computed(() =>
  attributeOrder.value.map((id) =>
    attributeByCategory.value.find((att) => att.id === +id),
  ),
);

watchEffect(() => {
  category.value = index.value != undefined ? categories.value[index.value] : undefined;
});
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
          v-model="index"
        >
          <option :value="undefined">---</option>
          <option v-for="(cat, index) in categories" :value="index">
            {{ cat.category_name }}
          </option>
        </select>
      </div>
    </div>

    <AddNewAttributeBtn :currentCategory="category" />
  </div>

  <template v-if="orderedAttribute.length">
    <div class="flex flex-wrap -mx-2 mt-3">
      <template v-for="attribute in orderedAttribute">
        <AttributeItem
          v-if="attribute"
          :attribute="attribute"
          :index="category?.attributes.findIndex((att) => att.id === attribute.id)"
        />
        <div v-else>wrong index</div>
      </template>
    </div>

    <div v-if="category" class="mt-5">
      <ChangeAttributeOrderBtn :currentCategory="category" />
    </div>
  </template>
  <NotFound v-else />
</template>
