<script setup>
import { ref, computed } from 'vue'
import { Skeleton as vSkeleton, SkeletonItem as vSkeletonItem } from '../components/skeleton.js'

const url = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Flarge%2F7489b2b9gy1gkfr6sqxy3j20zk0k0abq.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656180969&t=0fe1b5509a017aabd12334b9a6a0adcd"
const avatar = "https://img1.baidu.com/it/u=3789652124,1621870174&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"

const loading = ref(true)

const change3D = v => document.querySelector('html').classList[v.target.checked ? 'add' : 'remove']('three')
</script>

<template>
  <div>
    <br />

    <label for="loading">点击切换</label>
    <input v-model="loading" id="loading" type="checkbox" />

    <br /><br />

    <label for="threeView">3d视图</label>
    <input @input="change3D" id="threeView" type="checkbox" />

    <br /><br />

    <div class="card col" v-skeleton="loading">
      <img  class="cover" :src="url" v-skeleton-item />
      <div class="details row">
        <img class="avatar" :src="avatar" v-skeleton-item />
        <div class="flex1">
          <h3 class="title" v-skeleton-item>来看看小乃爱的White Lily吧</h3>
          <div class="line">
            <span class="info" v-skeleton-item>天使降临到我身边</span>
            <span class="info">&nbsp;</span>
            <span class="info" v-skeleton-item>⚪</span>
          </div>
          <div class="line">
            <span class="info" v-skeleton-item>8.9K views ·</span>
            <span class="info">&nbsp;</span>
            <span class="info" v-skeleton-item>1 day ago</span>
          </div>
        </div>
        <button class="btn" v-skeleton-item>:</button>
      </div>
    </div>

  </div>
</template>

<style>
.card {
  width: 360px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 20%);
}

.cover {
  width: 100;
  height: 203px;
}

.details {
  margin: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  margin-right: 12px;
  object-fit: cover;
  border-radius: 36px;
}

.title {
  margin: 0 0 4px 0;
  font-size: 16px;
  line-height: 22px;
  color: #030303;
  font-weight: 500;
}

.btn {
  margin: -4px 0 0 16px;
  width: 32px;
  height: 32px;
  border-radius: 12px;
  border: none;
  font-weight: bold;
  background: #0000000d;
}

.line {
  line-height: 20px;
}

.info {
  font-size: 12px;
  line-height: 14px;
  color: rgb(96, 96, 96);
}

.row {
  display: flex;
}
.col {
  display: flex;
  flex-direction: column;
}
.aic {
  align-items: center;
}
.flex1 {
  flex: 1;
}

label:active + input[type="checkbox"], input[type="checkbox"]:active {
  box-shadow: 0 0 0 10px rgba(0, 0, 0, .1);
}
</style>


<!-- 3d视图 -->
<style>
html {
  margin: 0px;
  perspective: 400px;
  perspective-origin: left center;
}
.three body {
  transform: rotate3d(-5.8, -3.4, 2, -37deg) translateX(110px)
}
body {
  margin: 0px;
  padding: 14px;
  transition: transform 1.6s;
  transform-style: preserve-3d;
  transform-origin: left;
}
.three .skeleton-container {
  opacity: .92;
  transform: translateZ(80px);
}
.skeleton-container {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 2.5s, opacity 1.5s;
}
</style>