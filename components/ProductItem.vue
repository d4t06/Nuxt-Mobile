<script setup lang="ts">
type Props = {
	product: Product;
	image_url?: string;
};

const props = defineProps<Props>();
</script>
<template>
	<div class="flex mt-2.5 group">
		<div class="h-[70px] w-[70px]">
			<img
				alt=""
				:src="props.image_url || props.product.image_url || '/search-empty.png'"
				class="rounded-md h-full object-contain"
			/>
		</div>

		<div class="ml-2 space-y-2">
			<p class="text-[#333] font-[500] group-hover:text-[#cd1818]">
				{{ props.product.product_name }}
			</p>

			<div v-if="props.product.product_tags.length" className="flex flex-wrap gap-1">
				<span v-for="tag in props.product.product_tags" class="tag-item">{{ tag.tag.name }}</span>
			</div>

			<div v-if="props.product.features.length" className="faded-text text-sm mt-1 sm:mt-0">
				<p v-for="f in props.product.features">{{ f.value }}</p>
			</div>
		</div>
	</div>
</template>
