===<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import EditorToolbar from "./EditorToolbar.vue";
import Video from "./video";


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
  extensions: [StarterKit, Image, Video],
  onUpdate: () => {
    isChange.value = true;
  },
});

const isChange = ref(false);

const classes = {
  wrapper: "my-editor bg-white rounded-lg overflow-hidden",
  editContainer: "max-h-[60vh] overflow-auto",
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
    <div :class="`${classes.editContainer} ${isDisable ? 'disabled' : ''}`">
      <editor-content
        class="prose pt-[30px] sm:mx-auto [&_img]:mx-auto pb-[50vh] [&_.ProseMirror-selectednode]:border-red-500"
        :editor="editor"
      />
    </div>
  </div>
</template>
