<script setup lang="ts">
import { useCategoryContext } from "~/stores/categoryProvider";
import CategoryList from "./_components/CategoryList.vue";
import AddNewCategoryBtn from "./_components/AddNewCategoryBtn.vue";
import BrandList from "./_components/BrandList.vue";
import AttributeList from "./_components/AttributeList.vue";

definePageMeta({
  layout: "dashboard",
});

const { isFetching, categories } = useCategoryContext();

const classes = {
  group: "p-[20px] rounded-[12px] bg-[#fff] border",
  label: "text-2xl",
};
</script>

<template>
  <Center v-if="isFetching">
    <Loading />
  </Center>

  <div v-else class="space-y-[30px]">
    <div class="flex justify-between items-center">
      <h1 :class="classes.label">Category</h1>
      <AddNewCategoryBtn />
    </div>
    <div :class="classes.group">
      <CategoryList />
    </div>
    <template v-if="categories.length">
      <h1 :class="classes.label">Brand</h1>
      <div :class="classes.group">
        <BrandList />
      </div>


      <h1 :class="classes.label">Attribute</h1>
      <div :class="classes.group">
        <AttributeList />
      </div>
    </template>
  </div>

  
</template>
