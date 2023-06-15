<!-- ParentComponent.vue -->
<template>
  <div>
    <h1>Virtual Scroll List Example</h1>
    <VirtualScrollList :totalItems="totalItems" :itemHeight="itemHeight" />
  </div>
</template>

<script>
import VirtualScrollList from './../components/VirtualScrollNew.vue';

export default {
  components: {
    VirtualScrollList,
  },
  data() {
    return {
      totalItems: 1000, // 总项数
      itemHeight: 50, // 每个项的高度
    };
  },
};
</script>
