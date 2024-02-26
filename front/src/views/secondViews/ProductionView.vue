<!-- 二级路由生产数据  -->
<template>
  <div class="production-wrapper">
    <LabelType1 :label="'梁体计划排程'" :eng="'Beam Plan'"></LabelType1>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="js">
import LabelType1 from '@/components/LabelType1.vue'
</script>
<style scoped lang="less">
.production-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--MainContentBgColor);
  border-radius: 15px;
  // background-color: #bfc;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
