<script setup lang="ts">
const route = useRoute();

const runtimeConfig = useRuntimeConfig();

const id = route.params["id"];

const { data, pending } = await useFetch<Product>(
	`${runtimeConfig.public.API_ENDPOINT}/products/${id}`,
	{
		key: `product-${id}`,
		lazy: true,
	},
);

const classes = {
	detailBody: "md:flex items-start mx-[-10px]",
	detailLeft: "md:w-1/3 px-[10px] flex-shrink-0 sm:sticky top-[10px]",
	detailRight: "mt-[30px] md:mt-0 md:flex-grow px-[10px] overflow-hidden",
};
</script>

<template>
	<div class="mt-5">
		<template v-if="pending">
			<p>...Loading</p>
		</template>

		<template v-else>
			<NotFound v-if="!data" />

			<div v-if="data" :class="classes.detailBody">
				<div :class="classes.detailLeft">
					<ProductSpecTable :product="data" />
				</div>

				<div :class="classes.detailRight">
					<div v-html="data.description.content"></div>
				</div>
			</div>
		</template>
	</div>
</template>
