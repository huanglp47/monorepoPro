<template>
  <div class="list-container" ref="container" @scroll="handleScroll">
    <div class="list-placeholder" :style="{ height: placeholderHeight + 'px' }"></div>
    <div class="list-viewport" :style="{ height: containerHeight + 'px', transform: 'translateY(' + scrollOffset + 'px)'}">
<!--      <div :style="{ transform: 'translateY(' + scrollOffset + 'px)' }">-->
        <div v-for="item in visibleItems" :key="item.id" class="list-item">
          {{ item.text }}
<!--        </div>-->
      </div>
    </div>
    <div class="list-placeholder" :style="{ height: placeholderHeight + 'px' }"></div>
  </div>
</template>

<script setup>
import { throttle } from 'lodash';
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemHeight: {
    type: Number,
    default: 50
  },
  containerHeight: {
    type: Number,
    default: 400
  }
});

const container = ref(null); // 列表容器的 DOM 引用
const scrollOffset = ref(0); // 滚动偏移量
const visibleItems = ref([]); // 可见列表项
const placeholderHeight = computed(() => props.items.length * props.itemHeight - props.containerHeight); // 占位高度

// 根据滚动位置计算可见列表项
const calculateVisibleItems = () => {
  const startIndex = Math.floor(scrollOffset.value / props.itemHeight);
  const endIndex = Math.ceil((scrollOffset.value + props.containerHeight) / props.itemHeight);
  visibleItems.value = props.items.slice(startIndex, endIndex);
};

// 处理滚动事件
// 设置节流的时间间隔，这里设置为200毫秒
const handleScroll = throttle(() => {
  scrollOffset.value = container.value.scrollTop;
  calculateVisibleItems();
}, 100);

// 初始化滚动事件监听
onMounted(() => {
  container.value.addEventListener('scroll', handleScroll);
});

// 移除滚动事件监听
onBeforeUnmount(() => {
  container.value.removeEventListener('scroll', handleScroll);
});

// 监听 items 变化，重新计算可见列表项
watch(() => props.items, () => {
  calculateVisibleItems();
});

nextTick(()=>{
  calculateVisibleItems();
})
// 计算初始的可见列表项

</script>

<style>
.list-container {
  height: 400px;
  border: 1px solid #ccc;
  overflow-y: auto;
  position: relative;
}

.list-placeholder {
  height: 0;
}

.list-viewport {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

.list-item {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
}
</style>
