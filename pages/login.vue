<script setup lang="ts">
definePageMeta({
	layout: "auth",
});

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isFetching = ref(false);

const { signIn } = useAuth();

const handleLogin = async (payload: Event) => {
	try {
		errorMessage.value = "";
		isFetching.value = true;
		await signIn(
			{
				username: username.value,
				password: password.value,
			},
			{
				external: true,
				redirect: false,
			},
		);
		navigateTo("/");
	} catch (error) {
		errorMessage.value = "Username or password is incorect";
	} finally {
		isFetching.value = false;
	}
};
</script>

<template>
	<div class="w-[400px] max-w-[90vw]">
		<Frame class="p-5">
			<div class="text-center text-2xl">
				<span class="text-[#cd1818]"> Nuxt </span>
				Mobile
			</div>

			<p
				v-if="errorMessage"
				class="p-2 mt-5 rounded-md text-center bg-red-500 text-white"
			>
				{{ errorMessage }}
			</p>
			<form class="flex flex-col mt-5" @submit.prevent="handleLogin">
				<div>
					<label>Username</label>
					<input
						v-model="username"
						type="text"
						placeholder="username"
						class="my-input"
					/>
				</div>
				<div class="mt-3">
					<label>Password</label>
					<input
						v-model="password"
						type="text"
						placeholder="password"
						class="my-input"
					/>
				</div>

				<p class="text-center">
					<Button
						:loading="isFetching"
						type="submit"
						className="px-5 py-1.5 mt-5 selt-center font-medium"
						size="clear"
						>Sign in</Button
					>
				</p>

				<p class="text-sm mt-5 ml-auto self-right">
					No have account jet?, get out!
				</p>
			</form>
		</Frame>
	</div>
</template>
