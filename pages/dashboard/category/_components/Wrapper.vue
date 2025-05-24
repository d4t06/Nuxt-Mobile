<script setup lang="ts">
import currentCategoryProvider from "../_hooks/currentCategoryProvider";

currentCategoryProvider();
</script>

<template>
  <slot />
</template>
