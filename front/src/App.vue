<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue';

</script>

<template>
  <main>
    <TopBar></TopBar>
    <RouterView></RouterView>
  </main>
</template>

<style scoped lang="less">

main{
    width: 100vw;
    height: 100vh;
}
</style>
