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

    <MyTable
      class-name="mt-2 [&_td]:text-sm [&_thead]:hidden"
      :col-list="['Specification', '']"
    >
      <template v-if="attributeData">
        <tr class="first:border-none" v-for="data in attributeData">
          <td class="text-[#808080]">
            {{ data.name }}
          </td>
          <td class="whitespace-break-spaces">
            {{ data.value }}
          </td>
        </tr>
      </template>
    </MyTable>
  </Frame>
</template>
