<script setup lang="ts">
const route = useRoute();

const runtimeConfig = useRuntimeConfig();
const { data: categories } = useNuxtData<Category[]>("categories");

const curCategory = computed(() =>
  categories.value?.find((c) => c.id === +route.params["category_id"]),
);

const brandObj = computed(() => {
  const data: Record<number, string> = {};

  curCategory.value
    ? curCategory.value.brands.map((b) => {
        data[b.id] = b.image_url;
      })
    : {};

  return data;
});

const _page = computed(() => +(route.query.page as string) || 1);

const { data, status, refresh } = await useFetch<ProductResponse>(
  () =>
    `${runtimeConfig.public.API_ENDPOINT}/products?category_id=${route.params["category_id"]}&page=${_page.value}`,
  {
    key: `category-${route.params["category_id"]}-${_page.value}`,
    lazy: true,
  },
);

const isRemaining = data.value
  ? data.value.page_size * data.value.page < data.value.count
  : false;

watch(
  () => route.query,
  () => {
    refresh();
  },
);
</script>

<template>
  <div class="mt-5">
    <Loading v-if="status === 'pending'" />

    <template v-else-if="data && data.products.length">
      <NuxtLink v-for="product in data.products" :href="`/product/${product.id}`">
        <ProductItem :image_url="brandObj[product.brand_id]" :product="product" />
      </NuxtLink>

      <Pagination :isRemaining="isRemaining" />
    </template>

    <NotFound v-else />
  </div>
</template>
