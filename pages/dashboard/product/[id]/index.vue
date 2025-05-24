<script setup lang="ts">
import productProvider from "./_hooks/productProvider";
import Wrapper from "./_components/Wrapper.vue";

definePageMeta({
  layout: "dashboard",
  middleware: "sidebase-auth",
});

productProvider();
</script>

<template>
  <Wrapper />
</template>
