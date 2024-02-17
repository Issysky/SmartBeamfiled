<!-- 二级路由生产数据  -->
<template>
  <div class="production-wrapper">
    <h1>生产数据</h1>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.production-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: var(--MainContentBgColor);
  border-radius: 15px;
}
</style>
