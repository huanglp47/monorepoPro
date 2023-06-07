<template>
  <div>
    <button class="sky-button"
            :disabled='disabled'
            :class="[`sky-button-${type}`, {
              'is-plain':plain,
              'is-disabled':disabled
            }]">
      <span><slot></slot></span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: 'default'
  },
  plain: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },

})

console.log(props.type)

</script>

<style scoped lang="less">
.sky-button {
  display: inline-block; /*变为行内块：*/
  line-height: 1;
  white-space: nowrap; /*规定段落中的文本不进行换行：*/
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none; /*去除谷歌浏览器自带按钮样式：*/
  text-align: center;
  box-sizing: border-box; /*内边距和边框放入宽高内*/
  outline: none; /*去除按钮自带边框*/
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  /*禁止元素的文字被选中*/
  -moz-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;

  &:hover, &:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}

.sky-button-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;

  &:hover,
  &:focus {
    background: #66b1ff;
    color: #fff;
  }
}

.sky-button-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;

  &:hover,
  &:focus {
    background: #85ce61;
    color: #fff;
  }
}

.sky-button-info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;

  &:hover,
  &:focus {
    background: #a6a9ad;
    color: #fff;
  }
}

.sky-button-warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;

  &:hover,
  &:focus {
    background: #ebb563;
    color: #fff;
  }
}

.sky-button-danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;

  &:hover,
  &:focus {
    background: #f78989;
    color: #fff;
  }
}
.sky-button.is-disabled{
  cursor: no-drop;
}

</style>