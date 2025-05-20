<script setup lang="ts">
type Props = {
  chooseList: ImageType[];
  select: () => void;
  index: number;
};

const props = defineProps<Props>();

const isInChooseList = computed(() => props.index !== -1);
</script>
<template>
  <button
    @click="props.select"
    :class="`${
      isInChooseList ? 'bg-[#cd1818] ' : 'bg-[#ccc] hover:bg-[#cd1818]'
    } z-10 h-[24px] w-[24px] absolute rounded-[6px] text-[white] left-[10px] bottom-[10px]`"
  >
    <span v-if="isInChooseList" className="text-[18px] font-semibold leading-[1]">
      {{ props.index + 1 }}
    </span>
  </button>
</template>
