<script setup lang="ts">
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import { PencilIcon, PhotoIcon, TrashIcon } from "@heroicons/vue/24/outline";
import useBrandAction from "../_hooks/useBrandAction";
import Gallery from "~/components/gallery/Gallery.vue";

type Props = {
  brand: Brand;
  index: number;
};

type Modal = "edit" | "delete" | "image";

const props = defineProps<Props>();

const { brand } = toRefs(props);

const modalRef = ref<ModalRef | null>(null);
const modal = ref<Modal | "">("");

const { actions, isFetching } = useBrandAction({ modalRef });

const openModal = (m: Modal) => {
  modal.value = m;
  modalRef.value?.open();
};
</script>

<template>
  <div class="border-[2px] border-[#e1e1e1] rounded-lg mt-2 ml-2">
    <ItemRightCtaFrame className="bg-none border-none">
      <span>{{ brand.brand_name }}</span>

      <div>
        <button @click="openModal('edit')">
          <PencilIcon class="w-5" />
        </button>
        <button @click="openModal('image')">
          <PhotoIcon class="w-5" />
        </button>
        <button @click="openModal('delete')">
          <TrashIcon class="w-5" />
        </button>
      </div>

      <Modal ref="modalRef">
        <ConfirmModal
          v-if="modal === 'delete'"
          label="Delete brand"
          :loading="isFetching"
          :closeModal="modalRef?.close"
          :submit="() => actions({ type: 'Delete', id: brand.id, index: props.index })"
        />

        <AddItemModal
          v-if="modal === 'edit'"
          variant="input"
          title="Edit brand"
          :loading="isFetching"
          :initValue="brand.brand_name"
          :closeModal="modalRef?.close"
          :submit="
            (v) =>
              actions({
                type: 'Edit',
                brand: {
                  brand_name: v,
                  brand_name_ascii: generateId(v),
                },
                id: brand.id,
                index: props.index,
              })
          "
        />

        <Gallery
          v-if="modal === 'image'"
          :closeModal="modalRef?.close"
          :setImageUrl="
            (images) =>
              actions({
                type: 'Edit',
                brand: {
                  image_url: images[0].image_url,
                },
                id: brand.id,
                index: props.index,
              })
          "
        />
      </Modal>
    </ItemRightCtaFrame>

    <img
      class="w-[90px] h-[90px] object-center mx-auto"
      :src="brand.image_url || '/search-empty.png'"
    />
  </div>
</template>
