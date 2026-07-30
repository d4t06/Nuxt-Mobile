<script setup lang="ts">
import Header from "./_components/Header.vue";
import Footer from "./_components/Footer.vue";
</script>

<template>
	<div class="flex flex-col min-h-screen">
		<Header />

		<div class="container flex-grow relative">
			<slot />
		</div>

		<Footer />
	</div>
</template>
