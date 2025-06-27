<script setup lang="ts">
import { Editor, type Content } from "@tiptap/vue-3";
import Gallery from "~/components/gallery/Gallery.vue";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";

type Props = {
  editor: Editor | undefined;
  isChange: boolean;
  isDisable: boolean;
  submit: () => void;
};

const props = defineProps<Props>();

const modalRef = ref<ModalRef>();

const handleAddImage = (imageList: ImageType[]) => {
  if (!props.editor) return;
  const imageContents: Content[] = imageList.map((i) => ({
    type: "image",
    attrs: {
      src: i.image_url,
    },
  }));

  props.editor.chain().focus().insertContent(imageContents).run();
};

const classes = {
  left: "flex mt-[-8px] ml-[-8px] flex-wrap [&_button]:px-[6px] [&_button]:mt-[8px] [&_button]:ml-[8px] [&_button]:font-[500] [&_button]:py-[3px] [&_button.active]:bg-white [&_button.active]:text-[#cd1818] [&_button.active]:rounded-[6px] ",
  right:
    "right flex flex-col space-y-[8px] sm:space-x-[8px] sm:space-y-0 sm:flex-row items-center",
};
</script>

<template>
  <div class="bg-[#cd1818] text-white flex justify-between items-center p-[10px]">
    <div :class="`${classes.left} ${props.isDisable ? 'disabled' : ''}`">
      <button
        @click="() => props.editor?.chain().focus().setParagraph().run()"
        :class="props.editor?.isActive('paragraph') ? 'active' : ''"
      >
        paragraph
      </button>
      <button
        @click="() => props.editor?.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="props.editor?.isActive('heading', { level: 5 }) ? 'active' : ''"
      >
        h5
      </button>
      <button @click="modalRef?.open">image</button>
      <button
        @click="() => props.editor?.chain().focus().undo().run()"
        :disabled="!props.editor?.can().chain().focus().undo().run()"
      >
        undo
      </button>
      <button
        @click="() => props.editor?.chain().focus().redo().run()"
        :disabled="!props.editor?.can().chain().focus().redo().run()"
      >
        redo
      </button>
    </div>
    <div :class="classes.right">
      <Button
        size="clear"
        colors="second"
        class="text-sm px-2 py-1"
        :disabled="!isChange"
        :onClick="props.submit"
      >
        save
      </Button>
    </div>
  </div>

  <Modal ref="modalRef">
    <Gallery
      :close-modal="modalRef?.close"
      :multiple="true"
      :set-image-url="handleAddImage"
    />
  </Modal>
</template>
