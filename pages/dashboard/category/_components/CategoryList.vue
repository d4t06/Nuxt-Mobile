<script setup lang="ts">
import { useCategoryContext } from "~/stores/categoryProvider";
import CategoryItem from "./CategoryItem.vue";

const { categories } = useCategoryContext();
</script>

<template>
  <div class="flex flex-wrap -mx-2 -mt-2">
    <template v-if="categories.length">
      <CategoryItem v-for="(cat, i) in categories" :index="i" :category="cat" />
    </template>
    <NotFound v-else />
  </div>
</template>
