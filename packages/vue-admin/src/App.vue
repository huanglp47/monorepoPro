<script setup></script>

<template>
  <header>
    <nav>
      <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/vscroll">虚拟滚动demo</RouterLink>
        <RouterLink to="/vscrollNew">虚拟滚动2demo</RouterLink>
        <RouterLink to="/puppeteer">测试使用puppeteer.js</RouterLink>
        <RouterLink to="/demo1">demo1</RouterLink>
        <RouterLink to="/demo2">模糊搜索</RouterLink>
      </div>
    </nav>
  </header>
  <RouterView/>
</template>

<style>
[v-cloak] {
  background: gray;
}

body {
  --test-var: 'green';
}

/*全局变量*/
:root {
  --fontSize: 19px;
  --bg-color: #1e90ff;
  --font-color: #1e90ff;
  --url: url("https://picsum.photos/id/1/200/300");
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
