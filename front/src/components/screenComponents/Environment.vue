<!-- 大屏中环境监测组件 -->
<template>
  <div class="environment-wrapper">
    <Line class="line" :width="'60%'" :label="'环境监测'"></Line>
    <div class="chart-wrapper">
      <ChartAir></ChartAir>
      <ChartNoise></ChartNoise>
    </div>
    <div class="data-wrapper">
      <div class="data">
        <p class="icon">○</p>
        <p class="label">温度:</p>
        <p class="value">{{ envData.data.temperature + '℃' }}</p>
      </div>
      <div class="data">
        <p class="icon">○</p>
        <p class="label">湿度:</p>
        <p class="value">{{ envData.data.humidity + '%' }}</p>
      </div>
      <div class="data">
        <p class="icon">○</p>
        <p class="label">风速:</p>
        <p class="value">{{ envData.data.wind_speed+'M/s' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import Line from '../Line.vue'
import ChartAir from './ChartAir.vue'
import ChartNoise from './ChartNoise.vue'
import { useEnvStore } from '../../stores/environment.js'
import { onMounted, ref, reactive } from 'vue'

// 定义store
const envStore = useEnvStore()
// 定义返回的环境数据
const envData = reactive({
  data: {}
})

onMounted(async () => {
  // 获取环境数据,必须传值,但是可以为空
  envData.data = await envStore.getEnvData('', '')
})
</script>

<style scoped lang="less">
.environment-wrapper {
  width: 22%;
  height: 32%;
  position: absolute;
  // background-color: #cdd0d6;
  top: 38%;
  border-radius: 15px;
  box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  color:var(--screen-font-color);

  .title {
    width: 40%;
    font-size: 1.5em;
    font-weight: bold;
    margin: 0;
    margin-top: 2%;
    text-align: center;
  }
  .line {
    margin-left: 7%;
    margin-bottom: 2%;
  }
  .chart-wrapper {
    width: 100%;
    flex: 1;
    margin-top: -2%;
    display: flex;
    justify-content: space-around;
  }
  .data-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 15%;
    display: flex;
    font-size: 0.8em;
    .data {
      flex: 1;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      p {
        margin: 0;
      }
    }
  }
}
</style>
