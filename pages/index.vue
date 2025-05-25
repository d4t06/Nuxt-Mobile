<script setup lang="ts">
import MobileCategories from "~/components/MobileCategories.vue";

const runtimeConfig = useRuntimeConfig();

const { data, status } = await useFetch<ProductResponse>(
  `${runtimeConfig.public.API_ENDPOINT}/products`,
);
</script>

<template>
  <div class="mt-5">
    <MobileCategories />

    <div class="text-xl font-medium text-[#1f1f1f] mt-5">Products</div>

    <Loading v-if="status === 'pending'" />

    <template v-else-if="data">
      <NuxtLink v-for="product in data.products" :href="`product/${product.id}`">
        <ProductItem :product="product" />
      </NuxtLink>
    </template>

    <NotFound v-else />
  </div>
</template>
