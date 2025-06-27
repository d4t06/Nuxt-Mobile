<script setup lang="ts">
import { useProductContext } from "../_hooks/productProvider";
const { product } = useProductContext();
</script>

<template>
  <div class="p-5 rounded-lg border">
    <div
      v-html="product?.description.content"
      class="content [&>*]:mt-5 [&>p]:text-[#495057] [&>h5]:font-[500] [&>h5]:text-xl [&>img]:rounded-[8px] sm:[&>img]:max-w-[80%] [&>img]:mx-auto"
    ></div>
  </div>
</template>
