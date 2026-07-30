<script setup lang="ts">
const searchKey = ref("");

const handleSearch = () => {
  if (!searchKey.value.trim()) return;
  navigateTo(`/search?key=${searchKey.value}`);
};
</script>

<template>
  <form class="flex items-center space-x-2" @submit.prevent="handleSearch">
    <input
      v-model="searchKey"
      placeholder="Dell 5300"
      class="my-input w-full mr-2"
      type="text"
      name=""
    />

    <img src="/icons/magnifying.png" class="w-6" />
  </form>
</template>
