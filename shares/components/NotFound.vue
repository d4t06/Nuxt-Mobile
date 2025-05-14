<script setup lang="ts">
type Props = {
  class?: string;
};

defineProps<Props>();
</script>

<template>
  <Center>
    <div :class="class">
      <img class="mx-auto" src="/search-empty.png" alt="" />
      <p class="text-center">No result found, ¯\_(ツ)_/¯</p>
    </div>
  </Center>
</template>
