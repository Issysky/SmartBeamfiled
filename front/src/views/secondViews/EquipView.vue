<!-- 二级路由 设备数据 -->
<template>
  <div class="equip-wrapper">
    <h1>设备数据</h1>
    <router-view></router-view>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.equip-wrapper {
  width: 100%;
  height: 100%;
  // background-color: #FFF;
  h1{
    height: 8%;
    background-color: aliceblue;
    margin: 0;
  }
}
</style>
