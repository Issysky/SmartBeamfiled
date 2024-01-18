<!-- 三级路由生产计划 出现在生产数据二级路由下 -->
<template>
  <div class="production-plan-wrapper">
    <!-- 月度计划 -->
    <div class="left">
      <div class="month-plan"></div>
      <Calendar></Calendar>
      <CardType2 v-if="productionPlanStore.isShow"></CardType2>
    </div>
    <div class="right">
      <ChartYear></ChartYear>
      <ChartMonth></ChartMonth>
    </div>
  </div>
</template>

<script setup lang="js">
import Calendar from '@/components/Calendar.vue'
import CardType2 from '@/components/CardType2.vue'
import { useProductionPlanStore } from '@/stores/production_plan'
import ChartYear from '@/components/ChartYear.vue'
import ChartMonth from '@/components/ChartMonth.vue'

const productionPlanStore = useProductionPlanStore()
</script>
<style scoped lang="less">
.production-plan-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 50%;
    height: 90%;
    background-color: #fff;
    .month-plan {
      width: 100%;
      height: 100px;
      background-color: #333;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
  }
  .right {
    width: 50%;
    height: 90%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
