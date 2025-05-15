<script setup lang="ts">
import useDashboardProduct from "./_hooks/useDashboardProduct";

definePageMeta({
  layout: "dashboard",
});

const { handleSubmit, products, currentTab, tabs, value, isFetching } = useDashboardProduct();
</script>

<template>
  <h1 class="text-2xl">All products</h1>
  <div class="flex justify-between mt-3">
    <SearchBar :submit="handleSubmit" />
    <AddProductButton categories="{categories}" />
  </div>


  <div
        :class="`mt-5 w-fit ${currentTab === 'All' ? 'pointer-events-none' : ''} self-start`"
      >
        <Tab :tabs="tabs" />
      </div>

  <Loading v-if="isFetching" />

  <template v-else-if="products.length">
    <NuxtLink v-for="product in products" :href="`/product/${product.id}`">
      <ProductItem :product="product" />
    </NuxtLink>
  </template>

  <NotFound v-else />
</template>
