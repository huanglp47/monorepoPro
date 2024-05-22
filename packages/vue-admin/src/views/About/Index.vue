<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'

const $route = useRoute()
const {id, a} = $route.query

console.log('id: ' + id)
console.log('a: ' + a)
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
