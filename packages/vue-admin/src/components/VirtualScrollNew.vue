<!-- VirtualScrollList.vue -->
<template>
  <div class="virtual-scroll-list" ref="scrollContainer">
    <div :style="{ height: totalHeight + 'px' }"></div>
    <div
        v-for="item in visibleItems"
        :key="item.id"
        :style="{ height: itemHeight + 'px' }"
        :ref="setElementRef"
    >
      <!-- 渲染每个可见项的内容 -->
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemHeight: {
    type: Number,
    required: true,
  },
});

const scrollContainer = ref(null);
const visibleItems = ref([]);
const itemRefs = reactive({});

// 计算总高度
const totalHeight = computed(() => props.totalItems * props.itemHeight);

// 设置元素引用
const setElementRef = (el) => {
  if (el) {
    itemRefs[el.dataset.itemId] = el;
  }
};

// 检查可见项
const checkVisibleItems = () => {
  const scrollContainerRect = scrollContainer.value.getBoundingClientRect();

  visibleItems.value = Object.keys(itemRefs).filter((itemId) => {
    const itemRect = itemRefs[itemId].getBoundingClientRect();
    return (
        itemRect.top >= scrollContainerRect.top - props.itemHeight &&
        itemRect.bottom <= scrollContainerRect.bottom + props.itemHeight
    );
  });
};

// 监听滚动事件
const observer = new IntersectionObserver(checkVisibleItems, {
  root: scrollContainer.value,
  rootMargin: `${props.itemHeight}px`,
});

onMounted(() => {
  checkVisibleItems(); // 初始检查可见项
  observer.observe(scrollContainer.value); // 开始观察滚动容器
});

// 监听props变化
watch([() => props.totalItems, () => props.itemHeight], () => {
  checkVisibleItems(); // 重新计算可见项
});
</script>

<style>
.virtual-scroll-list {
  overflow-y: auto;
  height: 400px;
  border: 1px solid #ccc;
}
</style>
