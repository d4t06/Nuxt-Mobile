<script setup lang="ts">
import AddProductBtn from "./_components/AddProductBtn.vue";
import useDashboardProduct from "./_hooks/useDashboardProduct";

definePageMeta({
  layout: "dashboard",
});

const { tabs, tab, fetchProduct, isFetching, products, value } = useDashboardProduct();
</script>

<template>
  <h1 class="text-2xl">All products</h1>
  <div class="flex justify-between items-center mt-3">
    <SearchBar
      v-model="value"
      :submit="
        () => {
          fetchProduct({
            variant: 'search',
          });
        }
      "
    />
    <AddProductBtn />
  </div>

  <div :class="`mt-5 ${tab === 'All' ? 'disabled' : ''}`">
    <Tab :tabs="tabs" :tab="tab" :setTab="(t) => (tab = t)" />
  </div>

  <div class="mt-3">
    <Loading v-if="isFetching" />

    <template v-else-if="products.length">
      <NuxtLink v-for="product in products" :href="`/product/${product.id}`">
        <ProductItem :product="product" />
      </NuxtLink>
    </template>

    <NotFound v-else />
  </div>
</template>
