<script setup lang="ts">
type Props = {
  src: string;
  className?: string;
};

defineProps<Props>();

const imageRef = ref<HTMLInputElement>();

const onError = (e: Event) => {
  const ele = e.target as HTMLImageElement;

  if (ele) {
    ele.src = "/search-empty.png";
  }
};
</script>
<template>
  <img ref="imageRef" :src="src" @error="onError" :class="className || ''" />
</template>
