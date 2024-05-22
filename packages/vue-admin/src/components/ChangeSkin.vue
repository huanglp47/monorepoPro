<template>
  <div class="test">css var换肤</div>
  <select v-model="selectedTheme" @change="handleChange">
    <option value="red" selected>red</option>
    <option value="blue">blue</option>
    <option value="green">green</option>
  </select>
  <button :class="buttonClass">换肤按钮</button>
</template>

<script setup>
import { ref, watch } from 'vue'
// import { THEME_CONFIG } from '../config/index'

const selectedTheme = ref('red'); // 默认主题
const buttonClass = ref('btn-red'); // 按钮的样式类

// 监听 selectedTheme 的变化并更新按钮的样式类
watch(selectedTheme, (newValue) => {
  buttonClass.value = `btn-${newValue}`;
});

// 处理选择框值改变的方法
function handleChange(event) {
  // 如果需要，你可以在这里添加更多的逻辑
  console.log('Theme changed to:', event.target.value);
}

</script>

<style scoped lang="less">
.btn-red {
  background-color: @color__red;
}

.btn-blue {
  background-color: @color__blue;
}

.btn-green {
  background-color: @color__green;
}

/* 其他可能的样式 */
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
</style>