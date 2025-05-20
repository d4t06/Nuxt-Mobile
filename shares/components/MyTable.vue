<script setup lang="ts">
type Props = {
  colList: string[];
  className?: string;
};

const props = defineProps<Props>();
</script>
<template>
  <div :class="`rounded-md overflow-hidden ${props.className || ''}`">
    <table
      class="w-full [&_td]:text-sm hover:[&_tr]:bg-black/5 [&_tbody_tr]:border-t [&_tr]:border-black/5 [&_th]:text-sm [&_th]:text-left [&_td]:p-2 [&_th]:p-2"
    >
      <thead class="bg-[#cd1818] text-white font-medium">
        <tr>
          <th v-for="item in props.colList">{{ item }}</th>
        </tr>
      </thead>

      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
