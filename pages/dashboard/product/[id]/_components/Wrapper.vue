<script setup lang="ts">
import useProductDetail from "../_hooks/useProductDetail";
import DangerZone from "./DangerZone.vue";
import Description from "./Description.vue";
import EditDescriptionBtn from "./EditDescriptionBtn.vue";
import Editor from "./Editor.vue";
import EditProductBtn from "./EditProductBtn.vue";
import SpecTable from "./SpecTable.vue";

const { fetchProduct, product, isFetching } = useProductDetail();

watchEffect(() => {
  fetchProduct();
});
</script>
<template>
  <Center v-if="isFetching">
    <Loading />
  </Center>

  <template v-else-if="product">
    <div class="space-y-8 [&_h1]:text-xl">
      <div class="flex justify-between items-center">
        <h1>{{ product.product_name }}</h1>

        <EditProductBtn />
      </div>

      <h1>Specification</h1>

      <SpecTable :product="product" />

      <div class="flex justify-between items-center">
        <h1>Detail</h1>

        <EditDescriptionBtn />
      </div>

      <Description />

      <h1 class="text-red-500">Danger Zone</h1>

      <DangerZone :product="product" />
    </div>
  </template>

  <NotFound v-else />
</template>
