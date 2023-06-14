<template>
    <div>demo页面</div>
</template>

<script lang="ts" setup>
interface User {
  name: string;
  age: number;
}
interface User {
  age11?: number;
}
type UserArray = User[];

function filterByAge(users: UserArray, ageThreshold: number): UserArray {
  return users.filter(item => item.age >= ageThreshold);
}
// 测试示例
const users: UserArray = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 20 },
  { name: 'Dave', age: 35 },
];
const filteredUsers = filterByAge(users, 30);
console.log(filteredUsers);

</script>

<style scoped>

</style>
