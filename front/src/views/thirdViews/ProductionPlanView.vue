<!-- 三级路由生产计划 出现在生产数据二级路由下 -->
<template>
  <div class="production-plan-wrapper">
    <!-- 月度计划 -->
    <div class="month-plan"></div>
    <Calendar></Calendar>
  </div>
</template>

<script setup lang="js">
import Calendar from '@/components/Calendar.vue'
</script>
<style scoped lang="less">
.production-plan-wrapper {
  .month-plan {
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
}
</style>
