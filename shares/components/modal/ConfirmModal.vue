<script setup lang="ts">
type Props = {
  submit: () => void;
  label?: string;
  desc?: string;
  loading: boolean;
  className?: string;
  closeModal?: () => void;
};

const props = withDefaults(defineProps<Props>(), {
  desc: "This action cannot be undone",
  label: " Wait a minute",
});

const { submit, className, closeModal, desc, label, loading } = toRefs(props);
</script>
<template>
  <div
    :class="`${className || 'w-[400px] max-w-[calc(90vw-40px)]'} ${
      loading ? 'opacity-60 pointer-events-none' : ''
    }`"
  >
    <h1 className="text-[20px] font-semibold">{{ label }}</h1>
    <p className=" text-[16px] font-semibold text-red-500">{{ desc }}</p>

    <div className="flex gap-[10px] mt-[20px]">
      <Button colors="second" @click="closeModal"> Close </Button>
      <Button className="min-w-[120px]" :loading="props.loading" @click="submit">
        Yes please
      </Button>
    </div>
  </div>
</template>
