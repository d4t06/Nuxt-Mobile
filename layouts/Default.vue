<script setup lang="ts">
import Header from "./_components/Header.vue";
import Footer from "./_components/Footer.vue";
</script>

<template>
	<div class="h-screen flex flex-col">
		<Header />

		<div class="container flex-grow relative">
			<slot />
		</div>

		<Footer />
	</div>
</template>
