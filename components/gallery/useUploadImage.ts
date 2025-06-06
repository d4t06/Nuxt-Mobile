import { useGalleryContext } from "~/stores/galleryProvider";
import { useToastContext } from "~/stores/toastProvider";

const IMAGE_URL = "/images";

export default function useUploadImage() {
  // hooks
  const { uploadingImages, images } = useGalleryContext();
  const { showToast } = useToastContext();

  const privateRequest = usePrivateFetch();

  const handleInputChange = async (e: Event) => {
    try {
      const inputEle = e.target as HTMLInputElement & { files: FileList };
      const fileLists = inputEle.files;

      // init tempImage
      const processImageList: ImageType[] = [];
      const fileNeedToUploadIndexes: number[] = [];

      const checkDuplicateImage = (ob: ImageType) => {
        return processImageList.some(
          (image) => image.name === ob.name && image.size == ob.size,
        );
      };

      let i = 0;
      for (const file of fileLists) {
        const imageObject: ImageType = initImageObject({
          name: generateId(file.name),
          image_url: URL.createObjectURL(file),
          size: file.size,
        });

        if (checkDuplicateImage(imageObject)) {
          URL.revokeObjectURL(imageObject.image_url);

          i++;
          continue;
        }

        processImageList.push(imageObject);
        fileNeedToUploadIndexes.push(i);

        i++;
      }

      uploadingImages.value = processImageList;

      for (const val of fileNeedToUploadIndexes.reverse()) {
        const file = fileLists[val] as File;

        const formData = new FormData();
        formData.append("image", file);

        const res = await privateRequest<ImageType>(IMAGE_URL, {
          body: formData,
          //   no need to specific content type with fetch
          //   headers: { "Content-Type": "multipart/form-data" },
          method: "POST",
        });

        processImageList.pop();

        uploadingImages.value = processImageList;
        images.value.unshift(res);
      }
      showToast(true, "Upload images successful");
    } catch (error) {
      console.log(error);
      showToast(false, "Upload images failed");
    } finally {
      uploadingImages.value = [];
    }
  };

  return { handleInputChange };
}
