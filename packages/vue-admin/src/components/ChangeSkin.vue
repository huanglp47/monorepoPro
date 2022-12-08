<template>
  <div class="test">
    <div class="test_in">css var换肤</div>
  </div>
  <select id="themeSelect">
    <option value ="deault">默认</option>
    <option value ="red">红色</option>
    <option value="green">绿色</option>
  </select>
</template>

<script setup>
import { THEME_CONFIG } from '../config/index'
// 存储当前用的是什么色系
let currentConfig = THEME_CONFIG['default'];
// 备份styles
let stylesBackups = null;

/**
 * 生成主题代码段
 * @param {Object} config
 * @returns
 */
function createThemeStyle(config) {
  let result = `
  :root {
    --main-color: ${config['--main-color']};
  }`
  return result;
}

/**
 * 插入主题style段
 * @param {String} styleString
 */
function insertThemeStyle(styleString) {
  let styleTag = document.querySelector('#themeStyleTag');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'themeStyleTag';
    styleTag.setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].insertBefore(styleTag, document.getElementsByTagName('style')[0]);
  }
  styleTag.innerHTML = styleString;
}

/**
 * 判断css变量是否被支持
 */
function cssVarIsSupport() {
  var testVar = getComputedStyle(document.body).getPropertyValue("--test-var");
  return testVar ? true : false;
}

/**
 * 根据主题配置生成正则
 * @returns string
 */
function createStyleRegex() {
  let regexStr = '';
  let varList = Object.keys(currentConfig);
  for(let i=0,len=varList.length; i<len; i++) {
    regexStr += `var\\(${varList[i]}\\)${i<len-1 ? '|' : ''}`;
  };
  return regexStr;
}

/**
 * css变量兼容处理-第一次
 */
function compatibleProcessingCssVar() {
  let styles = document.getElementsByTagName('head')[0].getElementsByTagName('style');
  stylesBackups = {};
  // 生成正则匹配规则字符串
  let regexStr = createStyleRegex();
  // 遍历所有style标签替换
  for(let i=1,len=styles.length; i<len; i++) {
    let item = styles[i];
    let replaceReg = new RegExp(regexStr, 'g');
    let styleStr = item.innerHTML;
    if (!replaceReg.test(styleStr)) {
      continue;
    }
    if (!stylesBackups['theme'+i]) {
      item.setAttribute('id', 'theme'+i);
      stylesBackups['theme'+i] = styleStr;
    }
    styleStr = styleStr.replace(replaceReg, function(mactchStr) {
      return currentConfig[mactchStr.split(/\(|\)/)[1]];
    });
    item.innerHTML = styleStr;
  }
}

/**
 * 解决兼容浏览器的动态换肤问题
 * css变量兼容处理-后面不需再去获取所有style，通过从内存中拿缓存的style来做字符串替换
 */
function compatibleProcessingCssVarFromCache() {
  // 生成正则匹配规则字符串
  let regexStr = createStyleRegex();
  let styleKeys = Object.keys(stylesBackups);
  // 遍历所有style标签替换
  for(let i=1,len=styleKeys.length; i<len; i++) {
    let key = styleKeys[i];
    let styleStr = stylesBackups[key];
    let replaceReg = new RegExp(regexStr, 'g');
    styleStr = styleStr.replace(replaceReg, function(mactchStr) {
      return currentConfig[mactchStr.split(/\(|\)/)[1]];
    });
    document.getElementById(key).innerHTML = styleStr;
  }
}

/**
 * 适配主题
 * @param {string} theme
 */
function adaptationTheme(theme) {
  // 获取颜色列表
  currentConfig = THEME_CONFIG[theme];
  // 对于兼容css var的浏览器
  if (cssVarIsSupport()) {
    // 生成style
    let styleString = createThemeStyle(currentConfig);
    // 插入style中
    insertThemeStyle(styleString)
  } else {
    // 对于不兼容css var的浏览器（chrome49、ie15以下）
    if (stylesBackups) {
      compatibleProcessingCssVarFromCache();
      return;
    }
    compatibleProcessingCssVar();
  }
}
window.onload = function(){
  adaptationTheme('default');

  // 动态更换主题
  document.querySelector('#themeSelect').addEventListener('change', function() {
    adaptationTheme(this.value)
  }, false)
}

</script>

<style scoped>
.test{
  width: 500px;
  height: 100px;
  /* 低版本不兼容的浏览器也有个默认颜色 */
  background-color: blue;
  background-color: var(--main-color);
  transition: background-color 0.8s linear;
}
.test_in{
  width: 100px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  background-color: #dddddd;
  /* 低版本不兼容的浏览器也有个默认颜色 */
  color: blue;
  color: var(--main-color);
}
</style>