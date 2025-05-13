<script setup lang="ts">
const route = useRoute();

const runtimeConfig = useRuntimeConfig();

const { data } = await useFetch<Product[]>(
	`${runtimeConfig.public.API_ENDPOINT}/products/search?q=${route.query["key"]}`,
);
</script>

<template>
	<div class="text-xl font-semibold mt-5">Search result:</div>

	<template v-if="data">
		<NuxtLink v-for="product in data" :href="`/product/${product.id}`">
			<ProductItem :product="product" />
		</NuxtLink>
	</template>
</template>
