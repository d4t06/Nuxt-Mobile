<script setup lang="ts">
import MyTable from "~/shares/components/MyTable.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import EditSpecBtn from "./EditSpecBtn.vue";

type Props = {
  product: Product;
};

type Attribute = { attribute: CategoryAttribute; value?: ProductAttribute };

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
      attribute: categoryAttribute,
      value: foundedValue,
    };

    attributeData.push(data);
  });

  return attributeData;
});
</script>
<template>
  <MyTable :col-list="['Name', 'Value', '']">
    <template v-if="attributeData">
      <tr class="first:border-none" v-for="data in attributeData">
        <td>
          {{ data.attribute.attribute_name }}
        </td>
        <td class="whitespace-break-spaces">
          {{ data.value?.value || "..." }}
        </td>

        <td class="text-right">
          <EditSpecBtn :product="props.product" :category-attribute="data.attribute" :attribute="data.value" />
        </td>
      </tr>
    </template>
  </MyTable>
</template>
