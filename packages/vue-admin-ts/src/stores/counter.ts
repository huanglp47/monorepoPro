import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state:()=>({
    name:'hlp',
    age:34,
    level: 10,
    friends:[
      {id:11,name:'why1'},
      {id:12,name:'why2'},
      {id:13,name:'why3'},
    ],
    banner:[],
    recommends: []
  }),
  getters:{
    ageAdd(state){
      return `姓名 : ${state.name} , 年龄 : ${state.age} , 等级 :${state.level}`
    }
  },
  actions:{

  }
})
