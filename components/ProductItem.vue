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
		<span class="text-[#333] font-[500] ml-[10px] group-hover:text-[#cd1818]">
			{{ props.product.product_name }}
		</span>
	</div>
</template>
