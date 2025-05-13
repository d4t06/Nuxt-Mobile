<script setup lang="ts">
type Props = {
	product: Product;
};

const props = defineProps<Props>();

const { data: categories } = useNuxtData<Category[]>("categories");

type Attribute = { name: string; value: string };

const attributeData = computed(() => {
	if (!categories.value) return;

	const productCategory = categories.value.find(
		(cat) => cat.id === props.product.category_id,
	);
	if (!productCategory) return;

	const attributeOrderArray = productCategory
		? productCategory.attribute_order.split("_")
		: [];

	const attributeData: Attribute[] = [];

	attributeOrderArray.map((id, index) => {
		const categoryAttribute = productCategory.attributes.find(
			(catAtt) => catAtt.id === +id,
		);
		if (categoryAttribute === undefined) return;
		const foundedValue = props.product.attributes.find(
			(attr) => attr.category_attribute_id == categoryAttribute.id,
		);

		const data: Attribute = {
			name: categoryAttribute.attribute_name,
			value: foundedValue?.value || "",
		};

		attributeData.push(data);
	});

	return attributeData;
});
</script>

<template>
	<Frame>
		<img
			:src="props.product.image_url || '/search-empty.png'"
			class="max-h-[200px] w-auto mx-auto mt-3"
			alt=""
		/>

		<div class="mt-3 text-center text-xl font-medium text-[#1f1f1f]">
			{{ product.product_name }}
		</div>

		<table
			class="mt-3 w-full [&_td]:text-sm hover:[&_tr]:bg-black/5 [&_tbody_tr]:border-t [&_tr]:border-black/5 [&_th]:text-sm [&_th]:text-left [&_td]:p-2 [&_th]:p-2"
		>
			<tbody>
				<template v-if="attributeData">
					<tr class="first:border-none" v-for="data in attributeData">
						<td>
							{{ data.name }}
						</td>
						<td>
							{{ data.value }}
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</Frame>
</template>
