<script setup lang="ts">
import MyImage from "~/shares/components/MyImage.vue";

type Props = {
  image: ImageType;
  setActive?: () => void;
  active: boolean;
};

const props = defineProps<Props>();

const classes = {
  imageContainer: "relative pt-[100%]",
  imageFrame:
    "absolute flex w-full items-center justify-center bg-[#f1f1f1] inset-0 rounded-[8px] border-[2px] border-[#ccc] hover:border-[#cd1818] overflow-hidden",
};
</script>

<template>
  <div class="px-[4px] relative w-1/3 sm:w-1/4 md:w-1/6 mt-[8px]">
    <div :class="classes.imageContainer">
      <div
        @click="props.setActive"
        :class="`${classes.imageFrame}
                        ${props.active ? 'border-[#cd1818]' : ''}`"
      >
        <MyImage class="w-full h-auto" :src="props.image.image_url" />

        <slot />
      </div>
    </div>
  </div>
</template>
