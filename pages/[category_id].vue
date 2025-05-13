<script setup lang="ts">
const route = useRoute();

const runtimeConfig = useRuntimeConfig();
const { data: categories } = useNuxtData<Category[]>("categories");

const { category_id } = route.params;
const { page = "1", brand_id } = route.query;

const curCategory = categories.value?.find((c) => c.id === +category_id);
const brandObj: Record<number, string> = {};
curCategory?.brands.forEach((b) => {
	brandObj[b.id] = b.image_url;
});

const query: Record<string, string> = { page: page + "" };

if (brand_id) query["brand_id"] = brand_id as string;

const { data, status } = await useFetch<ProductResponse>(
	`${runtimeConfig.public.API_ENDPOINT}/products?category_id=${category_id}`,
	{
		key: `category-${category_id}`,
		lazy: true,
		query,
	},
);
</script>

<template>
	<div class="mt-5">
		<template v-if="status === 'pending'">
			<p>Loading...</p>
		</template>

		<template v-if="data">
			<NuxtLink
				v-for="product in data.products"
				:href="`/product/${product.id}`"
			>
				<ProductItem
					:image_url="brandObj[product.brand_id]"
					:product="product"
				/>
			</NuxtLink>
		</template>
	</div>
</template>
