<script setup lang="ts">
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import useProductDetail from "./_hooks/useProductDetail";
import EditProductBtn from "./_components/EditProductBtn.vue";
import SpecTable from "./_components/SpecTable.vue";

definePageMeta({
  layout: "dashboard",
});

const { fetchProduct, product, isFetching } = useProductDetail();

watchEffect(() => {
  fetchProduct();
});
</script>

<template>
  <Loading v-if="isFetching" />

  <template v-else-if="product">
    <div class="space-y-8">
      <div class="flex justify-between">
        <p>{{ product.product_name }}</p>

        <EditProductBtn />
      </div>

      <h1>Specification</h1>

      <SpecTable :product="product" />
    </div>
  </template>

  <NotFound v-else />
</template>
