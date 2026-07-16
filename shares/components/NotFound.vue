<script setup lang="ts">
type Props = {
  className?: string;
};

const props = defineProps<Props>();
</script>

<template>
  <!-- <Center> -->
    <div :class="props.className">
      <img class="mx-auto w-[120px]" src="/search-empty.png" alt="" />
      <p class="text-center">No result found, ¯\_(ツ)_/¯</p>
    </div>
  <!-- </Center> -->
</template>
