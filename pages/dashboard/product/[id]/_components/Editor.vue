<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import EditorToolbar from "./EditorToolbar.vue";

type Props = {
  submit: (content: string) => void;
  content?: string;
  isDisable?: boolean;
};

// export type EditorRef = {
//   lock: () => void;
// };

const props = defineProps<Props>();

const editor = useEditor({
  content: props.content || "<p>Pass content as prop to Editor component</p",
  extensions: [StarterKit, Image],
  onUpdate: () => {
    isChange.value = true;
  },
});

const isChange = ref(false);

const classes = {
  wrapper: "my-editor bg-white rounded-lg overflow-hidden",
  editContainer: "max-h-[60vh] overflow-auto editor-container",
};
</script>

<template>
  <div ref="containerRef" :class="classes.wrapper">
    <EditorToolbar
      :isDisable="props.isDisable"
      :isChange="isChange"
      :submit="() => props.submit(editor?.getHTML() || '')"
      :editor="editor"
    />
    <div :class="`${classes.editContainer}`">
      <editor-content
        class="pt-[30px] sm:w-[70%] sm:mx-auto px-[20px] sm:px-[50px] pb-[50vh] [&_*]:mt-5 [&_h5]:text-lg [&_h5]:font-medium [&_p]:text-[#333]"
        :editor="editor"
      />
    </div>
  </div>
</template>
