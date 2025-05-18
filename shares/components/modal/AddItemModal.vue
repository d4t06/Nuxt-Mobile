<script setup lang="ts">
type Props = {
  closeModal?: () => void;
  submit: (value: string) => void;
  title: string;
  initValue?: string;
  loading?: boolean;
  variant: "input" | "text-are";
};

const props = defineProps<Props>();

const value = ref(props.initValue || "");

const { closeModal, initValue, loading, submit, title, variant } = toRefs(props);

const isChanged = computed(() => value.value !== initValue.value);
</script>

<template>
  <ModalHeader :closeModal="closeModal" :title="title" />
  <form
    action=""
    @submit.prevent="
      () => {
        submit(value);
      }
    "
  >
    <input
      v-if="variant === 'input'"
      class="my-input"
      placeholder="name..."
      v-model="value"
    />

    <textarea v-if="variant === 'text-are'" class="my-input" v-model="value" />

    <p class="text-right mt-[20px]">
      <Button
        :disabled="!isChanged"
        class="min-w-[70px]"
        :loading="loading"
        type="submit"
      >
        Save
      </Button>
    </p>
  </form>
</template>
