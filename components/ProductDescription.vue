<script setup lang="ts">
import type { ModalRef } from "~/shares/components/modal/Modal.vue";

type Props = {
  content: string;
};

const props = defineProps<Props>();

const modalRef = ref<ModalRef>();

const imageModalSrc = ref("");

watchEffect(
  () => {
    const onImageClick: EventListener = (e) => {
      imageModalSrc.value = (e.target as HTMLImageElement).src;

      modalRef.value?.open();
    };

    const imageEles = document.querySelectorAll(".content>img");

    if (imageEles)
      imageEles.forEach((el) => {
        el.addEventListener("click", onImageClick);
      });
  },
  {
    flush: "post",
  },
);
</script>
<template>
  <div
    class="content [&>*]:mt-5 [&>p]:text-[#495057] [&>h5]:font-medium [&>h5]:text-lg [&>img]:rounded-md sm:[&>img]:max-w-[90%] [&>img]:mx-auto"
    v-html="props.content"
  ></div>

  <Modal ref="modalRef">
    <ImageModal :close-modal="modalRef?.close" :src="imageModalSrc" />
  </Modal>
</template>
