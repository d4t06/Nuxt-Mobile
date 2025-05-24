<script setup lang="ts">
import AddProductBtn from "./_components/AddProductBtn.vue";
import { useProductsContext } from "./_hooks/productsProvider";
import useDashboardProduct from "./_hooks/useDashboardProduct";

definePageMeta({
  layout: "dashboard",
  middleware: "sidebase-auth",

});

const { tabs, tab, fetchProduct, isFetching, result, value } = useDashboardProduct();

const { products, page, isFetching: isGetMoreFetching } = useProductsContext();

const _products = computed(() => (tab.value === "All" ? products.value : result.value));
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

    <template v-else-if="_products.length">
      <NuxtLink v-for="product in _products" :href="`product/${product.id}`">
        <ProductItem :product="product" />
      </NuxtLink>

      <Loading v-if="isGetMoreFetching" />

      <p v-if="tab === 'All'" class="text-center">
        <Button
          :onClick="
            () => {
              page++;
              fetchProduct({ variant: 'get-products' });
            }
          "
          colors="second"
        >
          More
        </Button>
      </p>
    </template>

    <NotFound v-else />
  </div>
</template>
