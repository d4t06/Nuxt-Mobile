<script setup lang="ts">
import MyTable from "~/shares/components/MyTable.vue";
import { useCategoryContext } from "~/stores/categoryProvider";
import useSpectAction from "../_hooks/useSpecAction";

type Props = {
  product: Product;
};

type Attribute = { attribute: CategoryAttribute; value: ProductAttributeSchema };

const props = defineProps<Props>();

const { categories } = useCategoryContext();

const isEdit = ref(false);

const { action, isFetching } = useSpectAction();

const datas = computed(() => {
  if (!categories.value) return [];

  const productCategory = categories.value.find(
    (cat) => cat.id === props.product.category_id,
  );
  if (!productCategory) return [];

  const attributeOrderArray = productCategory
    ? productCategory.attribute_order.split("_")
    : [];

  const attributeData: Attribute[] = [];

  attributeOrderArray.map((id) => {
    const categoryAttribute = productCategory.attributes.find(
      (catAtt) => catAtt.id === +id,
    );
    if (categoryAttribute === undefined) return;
    const foundedValue = props.product.attributes.find(
      (attr) => attr.category_attribute_id == categoryAttribute.id,
    );

    const data: Attribute = {
      attribute: categoryAttribute,
      value: foundedValue || {
        id: undefined,
        category_attribute_id: categoryAttribute.id,
        product_id: props.product.id,
        value: "",
      },
    };

    attributeData.push(data);
  });

  return attributeData;
});

const inputs = ref<Attribute[]>([...datas.value]);

const handleUpdateAttribute = async () => {
  const payloads: ProductAttributeSchema[] = [];

  inputs.value.forEach((item) => {
    if (item.value.value.trim()) {
      payloads.push(item.value);
    }
  });

  await action({
    variant: "Add",
    productAttributes: payloads,
  });

  isEdit.value = false;
};
</script>
<template>
  <div class="flex items-center justify-between">
    <h1>Specification</h1>

    <div :class="`flex items-center ${isFetching ? 'disable' : ''}}`">
      <button @click="isEdit = !isEdit" class="p-1.5 rounded-lg">
        <img :src="`${isEdit ? '/icons/x.png' : '/icons/wrench.png'}`" class="w-6" />
      </button>

      <button v-if="isEdit" @click="handleUpdateAttribute" class="p-1.5 rounded-lg">
        <img src="/icons/check.png" class="w-6" />
      </button>
    </div>
  </div>

  <MyTable :col-list="['Name', 'Value']" class="[&_td]:py-3">
    <tr class="first:border-none" v-for="item in inputs">
      <td class="text-gray-600">
        {{ item.attribute.attribute_name }}
      </td>
      <td class="whitespace-break-spaces">
        <template v-if="!isEdit">
          {{ item.value.value || "..." }}
        </template>
        <textarea rows="1" v-else class="my-input" type="" name="" v-model="item.value.value" />
      </td>
    </tr>
  </MyTable>
</template>
