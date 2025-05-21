<script setup lang="ts">
import useProductDetail from "./_hooks/useProductDetail";
import EditProductBtn from "./_components/EditProductBtn.vue";
import SpecTable from "./_components/SpecTable.vue";
import DangerZone from "./_components/DangerZone.vue";
import productProvider from "./_hooks/productProvider";
import Wrapper from "./_components/Wrapper.vue";

definePageMeta({
  layout: "dashboard",
});

productProvider();
</script>

<template>
  <Wrapper />
</template>
