<script setup lang="ts">
type Props = {
  className?: string;
  styled?: boolean;
};

const props = withDefaults(defineProps<Props>(), { styled: true });
</script>
<template>
  <div
    :class="`flex flex-col max-h-[80vh] max-w-[90vw]  ${props.styled ? 'rounded-lg bg-white py-3 px-4' : ''} ${props.className || 'w-[400px]'}`"
  >
    <slot />
  </div>
</template>
