<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/outline";
const { data: categories } = useNuxtData<Category[]>("categories");
</script>

<template>
	<div class="block sm:hidden">
		<div class="text-xl font-medium text-[#1f1f1f] mb-3">Categories</div>

		<NuxtLink
			class="flex items-center space-x-1 mt-1.5 text-lg"
			v-for="cat in categories"
			:href="`/${cat.id}`"
		>
			<LinkIcon class="w-6" />
			<span class="font-medium">
				{{ cat.category_name }}
			</span>
		</NuxtLink>
	</div>
</template>
