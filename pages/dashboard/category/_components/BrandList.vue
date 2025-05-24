<script setup lang="ts">
import { useCategoryContext } from "~/stores/categoryProvider";
import AddNewBrandBtn from "./AddNewBrandBtn.vue";
import BrandItem from "./BrandItem.vue";
import { useCurrentCategoryContext } from "../_hooks/currentCategoryProvider";

const { categories } = useCategoryContext();
const { category, index } = useCurrentCategoryContext();

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

    <AddNewBrandBtn :currentCategory="category" />
  </div>

  <template v-if="category?.brands.length">
    <div class="flex flex-wrap -mx-2 mt-3">
      <BrandItem v-for="(brand, i) in category.brands" :index="i" :brand="brand" />
    </div>
  </template>
  <NotFound v-else />
</template>
