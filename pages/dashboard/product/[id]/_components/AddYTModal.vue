<script setup lang="ts">
import { useToastContext } from "~/stores/toastProvider";

type Props = {
	closeModal?: () => void;
	submit: (data: { title: string; id: string }) => void;
};

const props = defineProps<Props>();

const { showToast } = useToastContext();

const titleRef = ref("Disassembly video");
const idRef = ref("");

const videoIdRegex = /^([a-zA-Z0-9_-]{11})$/;
const extractIDRegex =
	/(?:v=|youtu\.be\/|embed\/|watch\?v=)([a-zA-Z0-9_-]{11})(?:$|&|\?)/;

const getVideoID = () => {
	const trimedId = idRef.value.trim();
	if (!trimedId) return "";

	if (trimedId.match(videoIdRegex)) {
		return trimedId;
	}

	if (!trimedId || typeof trimedId !== "string") {
		return "";
	}

	const match = trimedId.match(extractIDRegex);

	if (match && match[1]) {
		return match[1] || "";
	}

	return "";
};

const handleSubmit = () => {
	if (!titleRef.value.trim()) return;

	const finalID = getVideoID();
	if (!finalID) {
		showToast(false, "Invalid video ID");
		return;
	}

	props.submit({ title: titleRef.value, id: finalID });
};
</script>
<template>
	<ModalWrapper>
		<ModalHeader :close-modal="props.closeModal" title="Add video" />

		<div>
			<label>Title</label>
			<input class="my-input" v-model="titleRef" />
		</div>

		<div className="mt-3">
			<label>Id</label>
			<input v-model="idRef" class="my-input" />
		</div>

		<p className="mt-5 text-right">
			<button @click="handleSubmit">
				<img class="w-6" src="/icons/check.png" />
			</button>
		</p>
	</ModalWrapper>
</template>
