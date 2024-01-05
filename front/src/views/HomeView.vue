<template>
<div>
    <h1>homepage</h1>
    <button @click="logout">退出登录</button>
</div>
</template>

<script setup lang="js">
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
    router.push('/')
}
</script>
<style scoped lang="less">

</style>