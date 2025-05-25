<script setup lang="ts">
const route = useRoute();

const runtimeConfig = useRuntimeConfig();

const id = route.params["id"];

const { data, status } = await useFetch<Product>(
  `${runtimeConfig.public.API_ENDPOINT}/products/${id}`,
  {
    key: `product-${id}`,
    lazy: true,
  },
);

const classes = {
  detailBody: "md:flex items-start -mx-3",
  detailLeft: "md:w-1/3 px-3 flex-shrink-0 md:sticky top-[10px]",
};
</script>

<template>
  <div class="mt-5">
    <Loading v-if="status === 'pending'" />

    <template v-else-if="data">
      <div v-if="data" :class="classes.detailBody">
        <div :class="classes.detailLeft">
          <ProductSpecTable :product="data" />
        </div>
        <ProductDescription :content="data.description.content" />
      </div>
    </template>

    <NotFound v-else />
  </div>
</template>
