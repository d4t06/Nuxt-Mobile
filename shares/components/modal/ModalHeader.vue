<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/16/solid";

type Props = { title: string; closeModal?: () => void };

const props = defineProps<Props>();
</script>
<template>
  <div class="flex justify-between mb-[15px]">
    <h1 class="text-[22px] text-[#333] font-[500] mr-[10px] line-clamp-1">
      {{ props.title }}
    </h1>
    <Button size="clear" className="p-1" colors="second" @click="props.closeModal">
      <XMarkIcon class="w-6" />
    </Button>
  </div>
</template>
