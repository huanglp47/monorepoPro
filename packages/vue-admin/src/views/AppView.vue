<script setup>
import HelloWorld from './../components/HelloWorld.vue'
import {
  format,
  trimSpace,
  firstToUpperCase,
  flatArr
} from '@pense/utils'

import {
  SkyButton,
  SkyInput,
} from '@pense/components'

import {onMounted, ref} from 'vue'

// 测试
// getUser().then(res => {
//     console.log('%c123', 'color:red;')
// })

// 格式化时间
const time = format(new Date())
console.log(time)

// 测试：删除参数两端空白
const str = trimSpace('  76878,   bnbn  ')
console.log('%cstr的值：' + str, 'color:red;')

// 测试：首字母大写
const str2 = firstToUpperCase('sdsdfdf,dfdf,sdff')
console.log(str2)

// 数组扁平化
const arr = [11, [22, 33], 55, [66, [77, 88]]]
const newArr = flatArr(arr)
console.log(arr)
console.log(newArr)

// console.log(Axios)
// Axios.get('/user?ID=12345')
//     .then(function (response) {
//       // handle success
//       console.log(response);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .finally(function () {
//       // always executed
//     });

onMounted(() => {
  console.log(123456)
})

const clickEven = (val) => {
  console.log(val)
}

// 按钮点击
const getInfo = (val) => {
  console.log(111111)
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>
    <div class="wrapper">
      <!--            demo示例-->
      <HelloWorld
          ref="hello"
          msg="组件props"
          @clickChild="clickEven"
      />
      <div style="margin-left: 10px;">
        以下是远程npm组件引入测试demo：
        <!--            <sky-button type="primary">测试1111</sky-button>-->
        <!--            <sky-button>测试2222</sky-button>-->

        <sky-button plain @click="getInfo">按钮</sky-button>
        <sky-button disabled>按钮</sky-button>
        <sky-button plain type="primary">primary按钮</sky-button>
        <sky-button plain type="success">success按钮</sky-button>
        <sky-button plain type="info">info按钮</sky-button>
        <sky-button plain type="danger">danger按钮</sky-button>
        <sky-button plain type="warning">warning按钮</sky-button>

        <SkyInput></SkyInput>
      </div>
    </div>
  </header>

</template>

<style>
</style>
