<script setup lang="ts">
import ProductSpecTable from "~/components/ProductSpecTable.vue";
import { useProductContext } from "../_hooks/productProvider";
import useProductAction from "../_hooks/useProductAction";
import Editor, { type EditorRef } from "./Editor.vue";

const { action, isFetching } = useProductAction();
const { product } = useProductContext();

const editorRef = ref<EditorRef>();

const handleSubmit = async (v: string) => {
  if (!product.value) return;

    await action({
      variant: "edit-desc",
      desc: { content: v },
      productId: product.value?.id,
      callback: editorRef.value?.lock
    });

};
</script>

<template>
  <div :class="`overflow-hidden ${isFetching ? 'disabled' : ''}`">
    <Editor
      ref="editorRef"
      :submit="handleSubmit"
      :content="product?.description.content"
    />
  </div>
</template>
