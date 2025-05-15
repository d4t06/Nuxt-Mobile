<script setup lang="ts">

type Props = {
  tabs: string[];
  className?: string;
  currentTab: Ref<string>;
};

const props = defineProps<Props>();

const { currentTab, tabs,  className} = toRefs(props);

const classes = {
  inActiveTab: ` hover:bg-black/05`,
  activeTab: `bg-[#cd1818]`,
};
</script>

<template>
  <div :class="`bg-black/05 p-1.5 space-x-1 rounded-full ${className || ''}`">
    <button
      v-for="tab in tabs"
      size="clear"
      @click="event => {
              (event.target as HTMLButtonElement).blur();
          }
          "
      :class="`py-1 px-4 ${currentTab === tab ? classes.activeTab : classes.inActiveTab}`"
    >
      {{ tab }}
    </button>
  </div>
</template>
