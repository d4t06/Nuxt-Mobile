<script lang="ts" setup>
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { cva, type VariantProps } from "class-variance-authority";

const classes = {
	button:
		"inline-flex relative items-center justify-center z-0 hover:brightness-90",
};

const ButtonVariant = cva(classes.button, {
	variants: {
		variant: {
			primary:
				"before:content-[''] before:absolute before:z-[-1] before:inset-0 active:translate-y-[2px] active:before:shadow-none",
			clear: "before:content-none",
		},
		size: {
			primary: "px-5 py-1.5",
			clear: "",
		},
		colors: {
			primary:
				"before:border-[#a00000] text-[#fff] bg-[#cd1818] before:shadow-[0_2px_0_#a00000]",
			second:
				"before:border-[#ccc] text-[#333] bg-[#f6f6f6] before:shadow-[0_2px_0_#ccc]",
			clear: "",
		},
		rounded: {
			xl: "before:rounded-xl rounded-xl",
			lg: "before:rounded-lg rounded-lg",
			md: "before:rounded-md rounded-md",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "primary",
		colors: "primary",
		rounded: "md",
	},
});

type TypeProps = VariantProps<typeof ButtonVariant>;

type ButtonProps = {
	onClick?: () => void;
	href?: string;
	active?: boolean;
	loading?: boolean;
	disabled?: boolean;
	className?: string;
	variant?: TypeProps["variant"];
	colors?: TypeProps["colors"];
	size?: TypeProps["size"];
	rou?: TypeProps["size"];
	rounded?: TypeProps["rounded"];
};

const props = defineProps<ButtonProps>();
const {
	href,
	variant,
	colors,
	size,
	className,
	disabled = false,
	loading = false,
	onClick,
	active,
} = toRefs(props);
</script>

<template>
	<NuxtLink
		v-if="href"
		:to="href"
		:class="ButtonVariant({ variant, size, colors, className })"
	>
		<slot />
	</NuxtLink>

	<template v-else>
		<button
			:active="active"
			:disabled="loading || disabled"
			@click="onClick"
			:class="`${ButtonVariant({
				variant,
				size,
				colors,
				className,
			})}`"
		>
			<template v-if="loading">
				<ArrowPathIcon class="w-6 animate-spin" />
			</template>
			<template v-else>
				<slot />
			</template>
		</button>
	</template>
</template>
