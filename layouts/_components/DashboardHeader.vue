<script setup lang="ts">
import { useCategoryContext } from "~/stores/categoryProvider";

const { data: session } = useAuth();
const { categories, isFetching } = useCategoryContext();

const runtimeConfig = useRuntimeConfig();

const isScrolled = ref(false);

const handleScroll = (e: Event) => {
  if ((e.target as HTMLDivElement).scrollTop > 10) isScrolled.value = true;
  else isScrolled.value = false;
};

const getCategories = async () => {
  try {
    const res = await $fetch<Category[]>(
      `${runtimeConfig.public.API_ENDPOINT}/categories`,
    );
    categories.value = res;
    isFetching.value = false;
  } catch (error) {
    console.log(error);
  }
};

watchEffect(() => {
  const dashboardEle = document.querySelector(".dashboard-content");
  if (!dashboardEle) return;

  getCategories();
  dashboardEle.addEventListener("scroll", handleScroll);
});

const classes = {
  container:
    "absolute z-[99] bg-[#fff] flex items-center left-0 w-[100%] h-[60px] px-[20px]",
};
</script>

<template>
  <div :class="`${classes.container} ${isScrolled ? 'shadow-md' : ''}`">
    <div class="ml-auto">
      <button>
        {{ session?.username || "Unauthorized" }}
      </button>
    </div>
  </div>
</template>
