<!-- 主要内容页面 -->
<template>
  <div class="main-wrapper">
    <slot></slot>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.main-wrapper {
  height: 92vh;
  flex: 1;
  // background-color: var(--MainContentBgColor);
  // background-image: linear-gradient(to right top, #141414, #242424, #353535, #474747, #595959);
  background-size: contain;
  background-repeat:no-repeat ;
  display: flex;
  border-radius: 15px;
  box-shadow: 7px 7px 10px #00000033;
  transition: all 0.3s linear;
  margin-right: 2vw;
}
</style>
