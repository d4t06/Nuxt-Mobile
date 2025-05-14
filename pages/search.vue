<script setup lang="ts">
const route = useRoute();

const runtimeConfig = useRuntimeConfig();

const { data, status, refresh } = await useFetch<Product[]>(
	() =>
		`${runtimeConfig.public.API_ENDPOINT}/products/search?q=${route.query["key"]}`,
);

console.log(">> check ", route.query["key"]);

watch(
	() => route.query["key"],
	() => {
		refresh();
	},
);
</script>

<template>
	<Loading v-if="status === 'pending'" />

	<template v-else-if="data && data.length">
		<div class="text-xl font-semibold mt-5">Search result:</div>
		<NuxtLink v-for="product in data" :href="`/product/${product.id}`">
			<ProductItem :product="product" />
		</NuxtLink>
	</template>

	<NotFound v-else />
</template>
