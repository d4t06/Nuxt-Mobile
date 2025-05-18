<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import type { ModalRef } from "~/shares/components/modal/Modal.vue";
import useAttributeAction from "../_hooks/useAttributeAction";
import useCategoryAction from "../_hooks/useCategoryAction";

type Props = {
  currentCategory: Category;
};

const props = defineProps<Props>();

const currentIndex = ref<number>();

const modalRef = ref<ModalRef | null>(null);
const isOpen = ref(false);

const localAttributeOrder = ref<string[]>([]);

const { actions, isFetching } = useCategoryAction({ modalRef });

const orderedAttribute = computed(() =>
  localAttributeOrder.value.map((id) =>
    props.currentCategory.attributes.find((att) => att.id === +id),
  ),
);

const handleChangeOrder = (index: number) => {
  if (currentIndex.value === undefined) currentIndex.value = index;
  else if (index === currentIndex.value) currentIndex.value = undefined;
  else {
    const temp = localAttributeOrder.value[currentIndex.value];

    localAttributeOrder.value[currentIndex.value] = localAttributeOrder.value[index];
    localAttributeOrder.value[index] = temp;

    currentIndex.value = undefined;
  }
};

const handleSubmit = async () => {};

watch(
  () => props.currentCategory.attribute_order,
  () => {
    localAttributeOrder.value = props.currentCategory.attribute_order.split("_");
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <Button
    :onclick="
      () => {
        modalRef?.open(), (isOpen = true);
      }
    "
  >
    <ArrowPathIcon class="w-6" />
    <span class="hidden sm:block">Change order</span>
  </Button>

  <Modal ref="modalRef">
    <template v-if="isOpen">
      <ModalHeader
        :closeModal="
          () => {
            modalRef?.close();
            isOpen = false;
          }
        "
        title="Change order"
      />

      <div class="flex flex-col flex-grow overflow-auto space-y-2">
        <template v-for="(att, index) in orderedAttribute">
          <button
            v-if="att"
            @click="() => handleChangeOrder(index)"
            :data-id="att.id"
            :class="`attribute-item p-1.5 ${currentIndex === index ? 'bg-red-300' : 'hover:bg-red-300 bg-[#f1f1f1]'}  border-[2px] border-[#ccc] rounded-md`"
          >
            {{ att.attribute_name }}
          </button>

          <p v-else>Wrong index</p>
        </template>
      </div>

      <Button
        class="mt-3"
        :loading="isFetching"
        :onClick="
          () => {
            actions({
              type: 'Edit',
              category: { attribute_order: localAttributeOrder.join('_') },
              id: currentCategory.id,
            });
          }
        "
        >Save</Button
      >
    </template>
  </Modal>
</template>
' '
