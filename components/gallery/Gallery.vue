<script setup lang="ts">
import { ArrowPathIcon, ArrowUpTrayIcon, LinkIcon } from "@heroicons/vue/24/outline";
import { useGalleryContext } from "~/stores/galleryProvider";
import GalleryItem from "./GalleryItem.vue";
import useGalleryAction from "./useGallery";
import ChooseBtn from "./ChooseBtn.vue";

type Props = {
  setImageUrl: (images: ImageType[]) => void;
  closeModal?: () => void;
  multiple?: boolean;
};

const props = defineProps<Props>();

const { images, isLast, page, isFetching, uploadingImages } = useGalleryContext();

const chooseList = ref<ImageType[]>([]);
const activeImage = ref<ImageType>();

const { getImages } = useGalleryAction();

const select = (image: ImageType) => {
  const index = chooseList.value.findIndex((i) => i.id === image.id);

  if (index === -1) chooseList.value.push(image);
  else chooseList.value.splice(index, 1);
};

const handleSubmit = () => {
  if (props.multiple) {
    if (chooseList.value.length) props.setImageUrl(chooseList.value);
  } else {
    if (activeImage.value) props.setImageUrl([activeImage.value]);
  }

  props?.closeModal && props.closeModal();
};

watchEffect(() => {
  if (!images.value.length) {
    getImages();
  }
});

const classes = {
  container: "w-[85vw] bg-white h-[80vh] flex flex-col",
  imageContainer: "relative pt-[100%]",
  imageFrame:
    "absolute flex w-full items-center justify-center bg-[#f1f1f1] inset-0 rounded-[8px] border-[2px] border-[#ccc] hover:border-[#cd1818] overflow-hidden",
  galleryTop: "flex justify-between border-b border-black/15 mb-[10px] pb-[10px]",
  galleryBody: "flex-grow overflow-hidden flex mx-[-10px]",
  bodyLeft: "w-full sm:w-2/3 overflow-auto px-[10px]",
  bodyRight:
    "hidden text-sm sm:block px-[10px] overflow-auto pb-3 w-1/3 border-l border-black/15 space-y-[14px]",
};
</script>

<template>
  <ModalWrapper className="w-[900px] h-[500px]">
    <div :class="classes.galleryTop">
      <div class="flex items-center">
        <p class="text-[18px] sm:text-[22px] font-[500]">Gallery</p>
        <Button colors="second" class="ml-[10px]" size="clear">
          <label class="py-1 px-3 flex items-center" htmlFor="image_upload">
            <ArrowUpTrayIcon class="w-5" />
            <span class="hidden sm:block ml-[6px]">Upload</span>
          </label>
        </Button>
      </div>

      <Button size="clear" class-name="px-3 py-1" :onClick="handleSubmit">Ok</Button>
    </div>
    <div :class="classes.galleryBody">
      <div :class="classes.bodyLeft">
        <div class="flex flex-wrap mt-[-8px] overflow-x-hidden overflow-y-auto mx-[-4px]">
          <GalleryItem
            v-for="image in uploadingImages"
            className="opacity-[0.4]"
            :image="image"
            :active="false"
          >
            <ArrowPathIcon
              className="animate-spin absolute duration-1000 text-[#000] w-7"
            />
          </GalleryItem>

          <GalleryItem
            v-for="image in images"
            :image="image"
            :active="activeImage?.id === image.id"
            :setActive="
              () => {
                activeImage = image;
              }
            "
          >
            <ChooseBtn
              v-if="props.multiple"
              :chooseList="chooseList"
              :index="chooseList.findIndex((i) => i.id === image.id)"
              :select="() => select(image)"
            />
          </GalleryItem>

          <Loading v-if="isFetching" />
        </div>

        <div v-if="!isLast" class="text-center mt-[14px]">
          <Button
            :onclick="
              () => {
                page++;
                getImages();
              }
            "
            colors="second"
          >
            More
          </Button>
        </div>
      </div>
      <div :class="classes.bodyRight">
        <template v-if="activeImage">
          <MyImage className="w-full rounded-lg" :src="activeImage.image_url" />

          <p class="break-words">{{ activeImage.name }}</p>
          <div>
            <p>Size: {{ formatSize(activeImage.size) }}</p>
          </div>
          <Button> Delete </Button>
        </template>
      </div>
    </div>
  </ModalWrapper>
</template>
