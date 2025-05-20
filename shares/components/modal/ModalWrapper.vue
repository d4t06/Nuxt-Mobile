<script setup lang="ts">
type Props = {
  className?: string;
};

const props = defineProps<Props>();
</script>
<template>
  <div
    :class="`${props.className || 'w-[400px]'}  flex flex-col py-3 px-4 max-h-[80vh] max-w-[90vw] rounded-lg bg-white`"
  >
    <slot />
  </div>
</template>
