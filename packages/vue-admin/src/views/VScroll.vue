<template>
<!--  <VirtualList :listData="data" :estimatedItemSize="100" v-slot="slotProps">-->
  <VirtualList :listData="data" :estimatedItemSize="100">
    <template #default="{ item }">
      <p>
        <span style="color:red">{{item.id}}</span>
        {{item.value}}
      </p>
    </template>
  </VirtualList>
</template>

<script setup>
import { faker } from '@faker-js/faker';

import VirtualList from '../components/VirtualList.vue'

const LIST_LENGTH = 1000
// const songs = new Array(LIST_LENGTH).fill(0).map((_, idx) => ({idx: idx + 1}))

let data = [];
for (let id = 0; id < LIST_LENGTH; id++) {
  data.push({
    id,
    value: faker.lorem.sentences() // 长文本
  });
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
}
</style>