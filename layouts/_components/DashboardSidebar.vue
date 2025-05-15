<script setup lang="ts">
import {
  BookmarkSquareIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();

const pathName = route.path;

const expand = ref(false);

const classes = {
  container:
    "bg-[#fff] border-r border-black/15 transition-[width] max-h-[100vh] relative flex-shrink-0 w-[50px] sm:w-[70px]",
  containerExpand: "!w-[180px]",
  head: "h-[60px] flex items-center justify-center",
  logoText: "text-[22px] font-[500] whitespace-nowrap tracking-[-1px]",
  logoImage: "max-w-[50px] p-[4px]",
  item: "flex space-x-[6px] font-[500] items-center justify-center p-[10px] text-[#333] hover:text-[#cd1818] hover:bg-[#f8f8f8]",
  itemActive: "text-[#cd1818] bg-[#f1f1f1]",
  linkList: "[&_svg]:w-6 [&_svg]:flex-shrink-0",
};
</script>

<template>
  <div :class="`${classes.container} ${expand ? classes.containerExpand : ''}`">
    <div :class="classes.head">
      <h1 :class="classes.logoText">
        HD
        <span class="text-[#cd1818]">D<span v-if="expand">ashboard</span></span>
      </h1>
    </div>
    <div :class="classes.linkList">
      <NuxtLink
        href="/dashboard/product"
        :class="`${classes.item} ${expand ? '!justify-start' : ''}
               ${pathName === '/dashboard/product' ? classes.itemActive : ''}`"
      >
        <DevicePhoneMobileIcon />
        <span v-if="expand">Product</span>
      </NuxtLink>

      <NuxtLink
        :class="`${classes.item} ${expand ? '!justify-start' : ''}
               ${pathName === '/category' ? classes.itemActive : ''}
               `"
        href="/dashboard/category"
      >
        <BookmarkSquareIcon />
        <span v-if="expand">Asset</span>
      </NuxtLink>

      <NuxtLink
        :class="`${classes.item} ${expand ? '!justify-start' : ''}
               ${pathName === '/dashboard/comment' ? classes.itemActive : ''}
               `"
        href="/dashboard/comment"
      >
        <ChatBubbleLeftRightIcon />
        <span v-if="expand" class="whitespace-nowrap">Comment</span>
      </NuxtLink>

      <NuxtLink
        target="blank"
        :class="`${classes.item} ${expand ? '!justify-start' : ''}
               ${pathName === '/category' ? classes.itemActive : ''}
               `"
        href="/"
      >
        <BuildingStorefrontIcon />
        <span v-if="expand" class="whitespace-nowrap">My shop</span>
      </NuxtLink>
    </div>
    <Button
      @click="expand = !expand"
      class="hidden sm:flex p-[4px] !absolute bottom-[20px] right-0 translate-x-[50%] z-[10]"
      size="clear"
      border="clear"
    >
      <ChevronLeftIcon v-if="expand" class="w-[24px]" />
      <ChevronRightIcon v-else class="w-[24px]" />
    </Button>
  </div>
</template>
