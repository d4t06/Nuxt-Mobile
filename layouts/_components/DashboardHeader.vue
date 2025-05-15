<script setup lang="ts">
const { data: session } = useAuth();
// const isScrolled = ref(false);

// watchEffect(() => {
//   const handleScroll = (e: Event) => {
//     if ((e.target as HTMLDivElement).scrollTop > 10) isScrolled.value = true;
//     else isScrolled.value = false;
//   };

//   const dashboardEle = document.querySelector(".dashboard-content");
//   if (!dashboardEle) return;

//   dashboardEle.addEventListener("scroll", handleScroll);

//   onWatcherCleanup(() => {});
// });

const classes = {
  container:
    "absolute z-[99] bg-[#fff] flex items-center left-0 w-[100%] h-[60px] px-[20px]",
};
</script>

<template>
  <div :class="`${classes.container} `">
    <div class="ml-auto">
      <button>
        {{ session?.username || "Unauthorized" }}
      </button>
    </div>
  </div>
</template>
