<script setup lang="ts">
import useUploadImage from "./useUploadImage";

const { handleInputChange } = useUploadImage();

const classes = {
  container: `upload portal fixed z-[199] bottom-[120px] right-[30px] max-[549px]:bottom-[unset] max-[540px]:top-[10px] max-[540px]:right-[10px]`,
};
</script>
<template>
  <div :class="classes.container">
    <input
      @change="handleInputChange"
      type="file"
      multiple
      accept="image/*"
      id="image_upload"
      class="hidden"
    />
  </div>
</template>
