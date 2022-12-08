<script setup>
import { useMainStore } from "../stores/main";
import { defineEmits, onMounted, reactive, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import MyModal from '../components/MyModal.vue'
// 模态框显示与隐藏
const showModal = ref(false)
const $router = useRouter()

const store = useMainStore()

const props = defineProps({
  msg: {
    type: String,
    required: true
  },
  info: String,
})
const emit = defineEmits(['clickChild','close'])
const params = {
  content: 'b'
}
const clickHander=()=>{
  emit('clickChild', params)
}

const gotoDetail = ()=>{
  $router.push({
    path:"/about",
    query:{
      id: '1',
      a: '111',
    }
  })
}

const state = reactive({
  name: "zs",
  age: 19,
  count: 1,
})
const clickCount = ()=>{
  state.count++
}

watch(() => state.count, (newValue, oldValue) => {
  console.log('watch 已触发', newValue)
}, { deep: true })

const closeFn=()=>{
  showModal.value = false
}

const patchStore=()=>{
  store.$patch({
    name: '李四',
  })
}

const loginFn = ()=>{
  store.registerUser('admin', '123456')
}
</script>

<template>
  <div class="greetings">

    <div class="hr"></div>
    <div>pinia修改state: {{store.name}}</div>
    <div>pinia getter: {{store.otherGetter}}</div>
    <button @click="patchStore">修改state</button>

    <div class="hr"></div>
    <div>pinia action使用</div>
    <div>用户名是： {{ store.userData.useName }}</div>
    <div>密码是： {{ store.userData.password }}</div>
    <button @click="loginFn">ajax action</button>

    <div class="hr"></div>
    <p class="green">{{ props.msg }}</p>
    <button @click="clickHander">子组件按钮</button>

    <div class="hr"></div>
    <a href="javascript:;" @click="gotoDetail">打开详情页面</a>

    <div class="hr"></div>
    <p>{{state.count}}</p>
    <p>信息：{{state.name}}</p>
    <button @click="clickCount">点击计数</button>

    <div class="hr"></div>
    <p>点击弹出全局弹框组件</p>
    <button id="show-modal" @click="showModal = true">全屏的模态框</button>
    <Teleport to="body">
      <MyModal :show="showModal" @close="closeFn">
        <template #header>
          <h3>custom header</h3>
        </template>
      </MyModal>
    </Teleport>

    <div class="hr"></div>
    <h3>
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
.hr{
  padding: 10px;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
