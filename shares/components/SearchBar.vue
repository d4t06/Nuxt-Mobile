<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

type Props = {
  submit: () => void;
};

const model = defineModel({ default: "" });
const props = defineProps<Props>();

const inner = ref<HTMLInputElement | null>(null);

defineExpose({ inner });

const { submit } = toRefs(props);
</script>

<template>
  <form class="flex items-center space-x-2" @submit.prevent="submit">
    <input
      v-model="model"
      placeholder="..."
      class="my-input w-full"
      type="text"
      name=""
    />

    <Button size="clear" class="p-1">
      <MagnifyingGlassIcon class="w-6" />
    </Button>
  </form>
</template>
