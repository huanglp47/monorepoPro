<!-- src/components/SearchBox.vue -->
<template>
  <div>
    <input type="text" v-model="keyword" placeholder="Search..." @input="inputSearchText"/>

    <ul>
      <li v-for='info in results' :key='info.name' :info='info' class="item" v-html="info.name"></li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from 'vue';
// import { debounce } from 'lodash';

const infos = [
  {name:'地铁1',},
  {name:'地铁6',},
  {name:'地铁7',},
  {name:'地铁10',},
  {name:'地铁11',},
  {name:'公交112',},
  {name:'公交597',},
  {name:'公交593',},
];
const keyword = ref('');
const results = ref(infos);

const inputSearchText = (function(timeout){
  var timer;
  return function(e){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.search(e.target.value);
      //this.search_text = e.target.value
    }, timeout);
  }
})(100)

const search = function(text){
  var reg = RegExp(`(${text})`);
  var results = JSON.parse(JSON.stringify(this.infos));
  var matches = results.filter(info=>info.name.match(reg));
  matches.forEach(info=>{
    info.name = info.name.replace(reg,`<span class='highlight'>$1</span>`)});
  this.results = matches;
  console.log(this.results);
}

</script>

<style>
.highlight{
  color:red;
}
</style>