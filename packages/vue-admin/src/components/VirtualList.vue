<template>
  <div ref="list" :style="{height}" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div ref="phantom" class="infinite-list-phantom"></div>
    <div ref="content" class="infinite-list">
      <div
          class="infinite-list-item"
          ref="items"
          :id="item.id"
          :key="item.id"
          v-for="item in visibleData"
      >
        <slot ref="slot" :item="item.item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  onMounted,
} from 'vue'

const props = defineProps({
  //所有列表数据
  listData: {
    type: Array,
    default: () => []
  },
  //预估高度
  estimatedItemSize: {
    type: Number,
    required: true
  },
  //容器高度 100px or 50vh
  height: {
    type: String,
    default: "100%"
  }
})
const data = reactive({
  scrollTop: 0,
  //起始索引
  start: 0,
  //结束索引
  end: 10
})
const itemHeight=40;
const scrollEvent = (e)=>{
  const scrollTop=e.target.scrollTop
  data.scrollTop=scrollTop
  data.start=Math.floor(scrollTop/itemHeight)
  data.end=data.start+10
}

const visibleData=computed(()=>{
  return props.listData.slice(data.start,data.end)
})

</script>

<style scoped>
.infinite-list-container {
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.infinite-list-item {
  padding: 5px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
  /* height:200px; */
}
</style>