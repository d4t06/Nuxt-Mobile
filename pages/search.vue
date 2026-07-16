<script setup lang="ts">
const route = useRoute();

const key = computed(() => route.query["key"] || "");

const { data, status } = await useAPI<Product[]>(`/products/search`, {
	lazy: true,
	query: {
		q: key,
	},
});
</script>

<template>
	<div class="text-xl font-semibold mt-5">Search result for  "{{ key }}"</div>

	<ClientOnly>
		<Loading v-if="status === 'pending'" />

		<template v-else-if="data && data.length">
			<NuxtLink v-for="product in data" :href="`/product/${product.id}`">
				<ProductItem :product="product" />
			</NuxtLink>
		</template>

		<Center v-else>
			<NotFound />
		</Center>
	</ClientOnly>
</template>
