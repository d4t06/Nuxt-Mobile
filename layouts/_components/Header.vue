<script setup lang="ts">
import { ArrowRightStartOnRectangleIcon } from "@heroicons/vue/24/outline";

const { data: session, signOut } = useAuth();

const route = useRoute();
</script>

<template>
  <div class="container">
    <div class="sm:h-[60px] flex flex-col sm:flex-row items-start sm:items-center">
      <div
        class="flex relative items-center justify-center w-full h-[50px] sm:h-auto sm:w-auto"
      >
        <NuxtLink class="" href="/">
          <img src="/icons/house.png" class="w-12" />
        </NuxtLink>

        <div
          class="flex sm:hidden items-center absolute right-0 sm:r-unset sm:relative sm:ml-5"
        >
          <template v-if="session">
            <p v-if="session?.username">{{ session.username }}</p>

            <button @click="signOut()">
              <ArrowRightStartOnRectangleIcon class="w-6" />
            </button>
          </template>

          <NuxtLink class="hover:underline" href="/login" v-else>Sign in</NuxtLink>
        </div>
      </div>

      <div class="w-full sm:flex sm:items-center sm:w-auto ml-auto mt-[6px] sm:mt-0">
        <SearchBar v-if="route.path !== '/'" />

        <div class="hidden sm:flex items-center ml-5">
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
  </div>
</template>
