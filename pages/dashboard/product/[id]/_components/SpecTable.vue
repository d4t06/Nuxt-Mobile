<script setup lang="ts">
import MyTable from "~/shares/components/MyTable.vue";
import { useCategoryContext } from "~/stores/categoryProvider";

type Props = {
  product: Product;
};

type Attribute = { name: string; value: string };

const props = defineProps<Props>();

const { categories } = useCategoryContext();

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
  <MyTable :col-list="['name', 'value']">
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
  </MyTable>
</template>
