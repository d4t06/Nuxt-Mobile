<script setup lang="ts">
import { useCategoryContext } from "~/stores/categoryProvider";
import CategoryList from "./_components/CategoryList.vue";
import AddNewCategoryBtn from "./_components/AddNewCategoryBtn.vue";

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
    <template v-if="categories.length"> </template>
  </div>
</template>
