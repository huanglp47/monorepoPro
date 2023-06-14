<template>
  <div>
    <VirtualScroll :items="longList" :itemHeight="50" :containerHeight="400" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import VirtualScroll from './../components/VirtualScroll.vue';

export default {
  components: {
    VirtualScroll
  },
  setup() {
    const longList = ref([]);

    onMounted(() => {
      // 模拟异步获取长列表数据
      setTimeout(() => {
        longList.value = Array.from({ length: 1000 }, (v, i) => ({
          id: i,
          text: `Item ${i}`
        }));
      }, 1000);
    });

    return {
      longList
    };
  }
};
</script>
