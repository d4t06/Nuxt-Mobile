import { useGalleryContext } from "~/stores/galleryProvider";

type ImagesRes = {
  page: number;
  images: ImageType[];
  page_size: number;
  count: number;
};

export default function useGalleryAction() {
  const { isFetching, images, page, isLast } = useGalleryContext();

  const config = useRuntimeConfig();

  const IMAGE_URL = config.public.API_ENDPOINT + "/images";

  const getImages = async () => {
    try {
      isFetching.value = true;

      const res = await $fetch<ImagesRes>(`${IMAGE_URL}?page=${page.value}`);

      images.value.push(...res.images);
      isLast.value = res.count - page.value * res.page_size < 0;
    } catch (error) {
      console.log({ message: error });
    } finally {
      isFetching.value = false;
    }
  };

  return { getImages };
}
