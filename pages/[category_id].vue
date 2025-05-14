<script setup lang="ts">
const route = useRoute();

const runtimeConfig = useRuntimeConfig();
const { data: categories } = useNuxtData<Category[]>("categories");

const { category_id } = route.params;
const { page, brand_id } = route.query;

const curCategory = categories.value?.find((c) => c.id === +category_id);

const brandObj: Record<number, string> = {};
curCategory?.brands.forEach((b) => {
	brandObj[b.id] = b.image_url;
});

const _page = page ? (!isNaN(+page) ? +page : 1) : 1;

const query: Record<string, string> = { page: _page + "" };

if (brand_id) query["brand_id"] = brand_id as string;

const { data, status, refresh } = await useFetch<ProductResponse>(
	() =>
		`${runtimeConfig.public.API_ENDPOINT}/products?category_id=${category_id}`,
	{
		key: `category-${category_id}`,
		lazy: true,
		query,
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
			<NuxtLink
				v-for="product in data.products"
				:href="`/product/${product.id}`"
			>
				<ProductItem
					:image_url="brandObj[product.brand_id]"
					:product="product"
				/>
			</NuxtLink>

			<Pagination :isRemaining="isRemaining" />
		</template>

		<NotFound v-else />
	</div>
</template>
