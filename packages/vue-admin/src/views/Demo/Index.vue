<template>
  <div class="m-box">
    <div>autoComplete</div>
    <!--  <input v-model="value">-->
    <input :value="value" @input="value=$event.target.value">

    <div>-----------------</div>

    <input v-model="inputValue"/>
    <button @click="handleClick" class="add-button">Add Todo</button>

    <ul class="todo-list">
      <li
          v-for="(todo, index) in todoItems"
          :key="todo.id"
          class="todo-item"
          :class="{'todo-item-done':todo.done}"
          @click="todo.done=!todo.done"
      >
        <span v-if="todo.done">√</span>
        {{ todo.text }}
      </li>
    </ul>
  </div>

  <div class="m-box">
    <p>模糊搜索demo</p>
    <div>
      <input type="text" v-model="keyword" placeholder="Search..." @input="inputSearchText"/>

      <ul>
        <li v-for='info in results' :key='info.name' :info='info' class="item" v-html="info.name"></li>
      </ul>
    </div>
  </div>

</template>

<script setup>
import {ref, watch, computed} from 'vue';

const value = ref('')
watch(value, value => console.log(value))

const inputValue = ref('')
const todoItems = ref([])

function handleClick() {
  todoItems.value.push({
    id: Math.random().toString(36).slice(-8),
    done: false,
    text: inputValue.value,
  })

  inputValue.value = ''
}

const buttonColor = computed(() => {
  return inputValue.value ? 'black' : 'white'
})
const buttonPointerEvents = computed(() => {
  return inputValue.value ? 'initial' : 'none'
})


// 模糊搜索
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
.add-button {
  color: v-bind(buttonColor);
  pointer-events: v-bind(buttonPointerEvents);
}
.highlight{
  color:red;
}
</style>