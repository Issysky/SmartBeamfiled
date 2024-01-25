<!-- 主要内容页面 -->
<template>
  <div class="main-wrapper">
    
    <slot></slot>
  </div>
</template>

<script setup lang="js">

</script>
<style scoped lang="less">
.main-wrapper {
  height: 90vh;
  flex: 1;
  background-color: var(--MainContentBgColor);
  display: flex;
  border-radius: 15px;
  box-shadow: 7px 7px 10px #00000033;
  transition: all 0.3s linear;
  margin-right: 2vw;
}
</style>
