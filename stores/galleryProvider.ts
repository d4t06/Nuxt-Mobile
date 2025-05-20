import { inject, provide, ref } from "vue";

const useGallery = () => {
  const images = ref<ImageType[]>([]);
  const uploadingImages = ref<ImageType[]>([]);
  const page = ref(1);
  const isFetching = ref(true);
  const isLast = ref(false);

  return { images, isLast, page, isFetching, uploadingImages };
};

type ContextType = ReturnType<typeof useGallery>;

export default function galleryProvider() {
  const state = useGallery();

  provide("gallery_context", state);

  return state;
}

export function useGalleryContext() {
  const state = inject<ContextType>("gallery_context")!;
  if (!state) throw new Error("galleryProvider not provided");

  return state;
}
