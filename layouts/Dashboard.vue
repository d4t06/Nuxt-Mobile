<script setup lang="ts">
import DashboardHeader from "./_components/DashboardHeader.vue";
import DashboardSidebar from "./_components/DashboardSidebar.vue";
import categoryProvider from "~/stores/categoryProvider";
import ToastContainer from "./_components/ToastContainer.vue";
import toastProvider from "~/stores/toastProvider";
import galleryProvider from "~/stores/galleryProvider";
import UploadImagePortal from "~/components/gallery/UploadImagePortal.vue";
import productsProvider from "~/pages/dashboard/product/_hooks/productsProvider";

categoryProvider();
toastProvider();
galleryProvider();
productsProvider();



</script>

<template>
  <div class="flex fixed top-0 bottom-0 w-full overflow-hidden">
    <DashboardSidebar />
    <div class="relative flex flex-col w-full">
      <ClientOnly>
        <DashboardHeader />
      </ClientOnly>
      <div
        class="dashboard-content flex-grow overflow-auto pt-[60px] px-[10px] sm:px-[40px]"
      >
        <div class="pt-[30px] pb-[60px]">
          <slot />
        </div>
      </div>
    </div>
  </div>

  <UploadImagePortal />
  <ToastContainer />
</template>
