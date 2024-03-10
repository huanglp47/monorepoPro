<template>
  <div>autoComplete</div>
<!--  <input v-model="value">-->
  <input :value="value" @input="value=$event.target.value">

  <div>-----------------</div>

  <input v-model="inputValue" />
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
      {{todo.text}}
    </li>
  </ul>
</template>

<script setup>
  import { ref, watch, computed } from 'vue';

  const value = ref('')
  watch(value, value => console.log(value))

  const inputValue = ref('')
  const todoItems = ref([])

  function handleClick(){
    todoItems.value.push({
      id: Math.random().toString(36).slice(-8),
      done: false,
      text: inputValue.value,
    })

    inputValue.value = ''
  }

  const buttonColor = computed(()=>{
    return inputValue.value ? 'black' :'white'
  })
  const buttonPointerEvents = computed(() =>{
    return inputValue.value ? 'initial' :'none'
  })
</script>

<style scoped>
.add-button{
  color: v-bind(buttonColor);
  pointer-events: v-bind(buttonPointerEvents);
}

</style>