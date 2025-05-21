<script setup lang="ts">
import { ArrowRightStartOnRectangleIcon } from "@heroicons/vue/24/outline";
const runtimeConfig = useRuntimeConfig();

const searchKey = ref("");

const { data: session, signOut } = useAuth();

const { data } = await useFetch<Category[]>(
  `${runtimeConfig.public.API_ENDPOINT}/categories`,
  {
    key: `categories`,
  },
);

const handleSearch = () => {
  navigateTo(`/search?key=${searchKey.value}`);
};
</script>

<template>
  <div class="container">
    <div class="sm:h-[60px] flex flex-col sm:flex-row items-start sm:items-center">
      <div
        class="flex relative items-center justify-center w-full h-[50px] sm:h-auto sm:w-auto"
      >
        <NuxtLink class="text-2xl font-[500]" href="/">
          <span class="text-[#cd1818]">Next </span>Mobile
        </NuxtLink>
      </div>

      <div class="w-full sm:flex sm:items-center sm:w-auto ml-auto mt-[6px] sm:mt-0">
        <SearchBar :submit="handleSearch" v-model="searchKey" />

        <div class="flex items-center ml-5">
          <template v-if="session">
            <p v-if="session?.username">{{ session.username }}</p>

            <button @click="signOut()">
              <ArrowRightStartOnRectangleIcon class="w-6" />
            </button>
          </template>

          <NuxtLink class="hover:underline" href="/login" v-else>Sign in</NuxtLink>
        </div>
      </div>
    </div>
    <div
      class="bg-[#cd1818] h-[40px] text-white items-center px-[10px] rounded-[6px] hidden gap-[10px] sm:flex"
    >
      <template v-if="data">
        <NuxtLink v-for="cat in data" :href="`/${cat.id}`">
          {{ cat.category_name }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
