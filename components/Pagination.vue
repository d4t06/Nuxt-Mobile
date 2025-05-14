<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

type Props = {
	isRemaining: boolean;
};

const props = defineProps<Props>();

const route = useRoute();

const { category_id } = route.params;
const { page, brand_id } = route.query;

const _page = page ? (!isNaN(+page) ? +page : 1) : 1;
</script>
<template>
	<div class="flex mt-5 justify-center space-x-2">
		<Button
			v-if="_page > 1"
			:href="`/${category_id}${
				brand_id
					? `?page=${_page - 1}&brand_id=${brand_id}`
					: `?page=${_page - 1}`
			}`"
		>
			<ChevronLeftIcon class="w-6" />
			Previous
		</Button>
		<Button
			:href="`/${category_id}${
				brand_id
					? `?page=${_page + 1}&brand_id=${brand_id}`
					: `?page=${_page + 1}`
			}`"
			colors="second"
			:disabled="!props.isRemaining"
		>
			Next
			<ChevronRightIcon class="w-6" />
		</Button>
	</div>
</template>
