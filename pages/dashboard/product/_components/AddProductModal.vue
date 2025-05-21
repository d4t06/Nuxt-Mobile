<script setup lang="ts">
import { PhotoIcon } from "@heroicons/vue/24/outline";
import Gallery from "~/components/gallery/Gallery.vue";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import useAddProduct from "../_hooks/useAddProduct";

type Props = {
  closeModal?: () => void;
  title: string;
};

type AddProduct = {
  type: "Add";
};

type EditProduct = {
  type: "Edit";
  product: Product;
  callback: (product: Partial<ProductSchema>) => void;
};

const props = defineProps<Props & (AddProduct | EditProduct)>();

const { categories } = useCategoryContext();

const productData = ref(
  (() => {
    switch (props.type) {
      case "Edit":
        const { product } = props;

        return initProductObject({
          image_url: product.image_url,
          product_name: product.product_name,
          product_name_ascii: product.product_name_ascii,
          brand_id: product.brand_id,
          category_id: product.category_id,
        });
      default:
        return initProductObject({});
    }
  })(),
);

const modalRef = ref<ModalRef>();

const { addProduct, isFetching } = useAddProduct({ closeModal: props.closeModal });

const currentCategory = computed(() =>
  productData.value
    ? categories.value.find((c) => c.id === productData.value.category_id)
    : undefined,
);

const isChange = computed(() =>
  props.type === "Add"
    ? true
    : productData.value.product_name !== props.product.product_name ||
      productData.value.brand_id !== props.product.brand_id,
);

const ableToSubmit = computed(
  () =>
    isChange.value &&
    !!productData.value.product_name &&
    productData.value.category_id !== undefined &&
    productData.value.brand_id !== undefined,
);

watchEffect(() => {
  productData.value.product_name_ascii = generateId(productData.value.product_name);
});
</script>

<template>
  <ModalWrapper class-name="w-[700px]">
    <ModalHeader :closeModal="props.closeModal" :title="props.title" />
    <div class="flex-grow overflow-x-hidden">
      <div class="sm:flex sm:flex-row mx-[-8px] mt-[14px] pb-[30px]">
        <div class="w-full sm:w-1/3 px-[8px]">
          <div class="h-[180px] w-[180px]">
            <MyImage class-name="w-full" :src="productData.image_url" />
          </div>

          <Button
            size="clear"
            class-name="p-1.5"
            :onclick="modalRef?.open"
            colors="second"
          >
            <PhotoIcon class="w-6" />
            <span>Change image</span>
          </Button>
        </div>

        <div class="mt-[30px] sm:mt-0 w-full">
          <div class="space-y-[14px] px-[8px]">
            <div class="space-y-[4px]">
              <label htmlFor="">Name</label>
              <input class="my-input" type="text" v-model="productData.product_name" />
            </div>

            <div :class="`space-y-[4px] ${props.type === 'Edit' ? 'disabled' : ''}`">
              <label htmlFor="">Category</label>
              <select v-model="productData.category_id" class="my-input">
                <option :value="undefined">- - -</option>
                <option v-for="cat in categories" :value="cat.id">
                  {{ cat.category_name }}
                </option>
              </select>
            </div>

            <div class="space-y-[4px]">
              <label htmlFor="">Brand</label>
              <select v-model="productData.brand_id" class="my-input">
                <option :value="undefined">- - -</option>
                <option v-for="brand in currentCategory?.brands" :value="brand.id">
                  {{ brand.brand_name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-right mt-[10px]">
      <Button
        :disabled="!ableToSubmit"
        :loading="isFetching"
        :onClick="
          () =>
            props.type === 'Add'
              ? addProduct({ variant: 'Add', product: productData })
              : addProduct({
                  variant: 'Edit',
                  product: productData,
                  id: props.product.id,
                  callback: () => props.callback(productData),
                })
        "
      >
        Save
      </Button>
    </div>
  </ModalWrapper>

  <Modal ref="modalRef">
    <Gallery
      :close-modal="modalRef?.close"
      :set-image-url="(images) => (productData.image_url = images[0].image_url)"
    />
  </Modal>
</template>
