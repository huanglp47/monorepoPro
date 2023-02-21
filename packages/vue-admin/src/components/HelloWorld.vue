<script setup>
import { useMainStore } from "../stores/main";
import { defineEmits, onMounted, reactive, ref, watch, watchEffect} from 'vue'
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
  user:{
    count:10
  }
})
const clickCount = ()=>{
  state.count++
  state.age++
}

// watch(() => state.count, (newValue, oldValue) => {
//   console.log('watch 已触发', newValue)
// }, { deep: true })


watchEffect(()=>{
  console.log('watchEffect 已触发', state.count + ' age: '+state.age )
})

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
    <div>测试全局less引入</div>
    <ul class="golalVar">
      <li>45</li>
      <li>
        <span class="aa">56</span>
      </li>
      <li>78</li>
    </ul>

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
  </div>
</template>

<style scoped lang="less">
ul{
  list-style: none;
  li{
    border-bottom: 1px solid #ccc;
    line-height: 60px;
    color: @primary-color;
    font-size: 14px;
    .aa{
      font-size: 18px;
      color: #00bd7e;
      .bordered();
      .border-radius(5px);
    }
  }

}

.hr{
  padding: 20px;
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
