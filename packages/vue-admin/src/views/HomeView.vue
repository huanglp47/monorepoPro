<script setup>
import ChangeSkin from '../components/ChangeSkin.vue'
import TheWelcome from '../components/TheWelcome.vue'

import useMousePosition from "../hooks/useMousePosition";

const {x, y} = useMousePosition()

const color = 'red'
</script>

<template>
  <main>
    <ChangeSkin />
    <div class="p1">当前鼠标X:{{x}}</div>
    <div class="p2">当前鼠标y:{{y}}</div>
    <div class="img"></div>
    <TheWelcome />
  </main>
</template>

<style scoped>
  .p1{
    color:  v-bind(color);
  }
  .p2{
    font-size: var(--fontSize);
    color: var(--font-color);
  }
  .img{
    width: 100px;
    height: 200px;
    background:var(--url)
  }
</style>
