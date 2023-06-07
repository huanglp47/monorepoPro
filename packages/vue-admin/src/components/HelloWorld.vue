<script setup>
// import axios from 'axios' // 测试mock,可以删除
import {useMainStore} from "../stores/main";
import {defineEmits, onMounted, reactive, ref,customRef, watch, watchEffect, toRef} from 'vue'
import {useRouter} from 'vue-router'
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
const emit = defineEmits(['clickChild', 'close'])
const params = {
  content: 'b'
}
const clickHander = () => {
  emit('clickChild', params)
}

const gotoDetail = () => {
  $router.push({
    path: "/about",
    query: {
      id: '1',
      a: '111',
    }
  })
}

const state = reactive({
  name: "zs",
  age: 19,
  count: 1,
  user: {
    count: 10
  }
})
const clickCount = () => {
  state.count++
  state.age++
}

// watch(() => state.count, (newValue, oldValue) => {
//   console.log('watch 已触发', newValue)
// }, { deep: true })


watchEffect(() => {
  console.log('watchEffect 已触发', state.count + ' age: ' + state.age)
})

const closeFn = () => {
  showModal.value = false
}

const patchStore = () => {
  store.$patch({
    name: '李四',
  })
}

const loginFn = () => {
  store.registerUser('admin', '123456')
}

const loading = ref(false);
// let listData = reactive([])
// let listData = ref([])
let listData = reactive({
  list: []
})

async function getData() {
  try {
    loading.value = true;
    //注意，这样重新定义会导致失去响应式，页面不更新，不用reactive([])，改用ref([])
    // listData = await store.getHitsApi()
    // listData.value = await store.getHitsApi()
    listData.list = await store.getHitsApi()
    console.log(listData);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getData();


  // 测试mock,可以删除
  // axios.get("/pc/placement").then((res) => {
  //   console.log(res);
  // });

  // 测试mock,可以删除, 调用action方法
  // var aa = store.getHitsApi()
  // console.log(aa)
});

const getPiniaData = () => {
  let data = store.someHits
  console.log('pinia getter的缓存：')
  console.log(data)
}

//使用Vue准备好的内置ref
// let keyword = ref('hello')
function useDebounceRef(value,delay=200) {
  let timer = null
  return customRef((track,trigger)=> {
    return {
      get() {
        track() //告诉Vue这个value值是需要被“追踪”的
        return value
      },
      set(newValue) {
        clearTimeout(timer)
        timer = setTimeout(()=>{
          value = newValue
          trigger() //告诉Vue去更新界面
        },delay)
      }
    }
  })
}
const keyword = useDebounceRef('abc')

let obj = {name : 'alice', age : 12};
// // let newObj= ref(obj.name);
// let newObj= toRef(obj,'name');

let info= reactive(obj);
let newObj= toRef(info,'name');

function change(){
  newObj.value = 'Tom';
  console.log(123456)
  console.log(obj)
  console.log(newObj)
}



</script>

<template>
  <div>
    newObj: {{newObj}}
  </div>
  <button @click="change">修改newObj</button>

  <div class="greetings">
    <div class="hr"></div>
    <div>测试customRef</div>
    <input type="text" v-model="keyword">
    <h3>{{keyword}}</h3>


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
    <div>pinia修改state: {{ store.name }}</div>
    <div>pinia getter: {{ store.otherGetter }}</div>
    <button @click="patchStore">修改state</button>

    <div class="hr"></div>
    <div>pinia action使用</div>
    <div>用户名是： {{ store.userData.useName }}</div>
    <div>密码是： {{ store.userData.password }}</div>
    <button @click="loginFn">ajax action</button>

    <div class="hr"></div>
    <p class="green">{{ msg }}</p>
    <button @click="clickHander">子组件按钮</button>

    <div class="hr"></div>
    <a href="javascript:;" @click="gotoDetail">打开详情页面</a>

    <div class="hr"></div>
    <p>{{ state.count }}</p>
    <p>信息：{{ state.name }}</p>
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
    <div>
      <div>axios loading状态：{{ loading }}</div>
      <div v-for="item in listData.list" :key="item.target_id">
        <span>id：{{ item.target_id }}</span>
      </div>

      <button @click="getPiniaData">点击获取getter处理过的数据缓存</button>
    </div>
  </div>
</template>

<style scoped lang="less">
ul {
  list-style: none;

  li {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
    color: @primary-color;
    font-size: 14px;

    .aa {
      font-size: 18px;
      color: #00bd7e;
      .bordered();
      .border-radius(5px);
    }
  }

}

.hr {
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
