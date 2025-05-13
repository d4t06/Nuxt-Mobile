<script setup lang="ts">
const isLoggedIn = ref(false);
</script>

<template>
	<div className="{classes.container}">
		<template v-if="isLoggedIn">
			<p>hi!, <span className="font-[500]">{session.user.name}</span></p>

			<button className="ml-[10px] hover:text-[#cd1818]">
				<ArrowRightStartOnRectangleIcon className="w-[22px]" />
			</button>
		</template>

		<NuxtLink
			v-else
			className="font-[500] hover:text-[#cd1818] p-1"
			href="/login"
		>
			Sign In
		</NuxtLink>
	</div>
</template>
