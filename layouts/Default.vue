<script setup lang="ts">
import Header from "./_components/Header.vue";
import Footer from "./_components/Footer.vue";
</script>

<template>
	<Header />

	<div class="container min-h-[calc(100vh-180px)] relative">
		<slot />
	</div>

	<Footer />
</template>
