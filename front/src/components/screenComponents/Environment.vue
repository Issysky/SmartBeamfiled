<!-- 大屏中环境监测组件 -->
<template>
  <div class="environment-wrapper">
    <Line class="line" :width="'60%'" :label="'环境监测'"></Line>
    <!-- 仪表盘图表 -->
    <div class="chart-wrapper">
      <div class="chart-air">
        <p class="title">PM2.5</p>
        <ChartAir></ChartAir>
      </div>
      <div class="chart-noise">
        <p class="title">噪音指数</p>
        <ChartNoise></ChartNoise>
      </div>
    </div>
    <!-- 下方的温湿度风速显示 -->
    <div class="data-wrapper">
      <div class="data tem">
        <span class="iconfont icon-temperature"></span>
        <p class="value">{{ envData.data.temperature + '℃' }}</p>
      </div>
      <div class="data hum">
        <span class="iconfont icon-humidity"></span>
        <p class="value">{{ envData.data.humidity + '%' }}</p>
      </div>
      <div class="data wind">
        <span class="iconfont icon-wind_speed"></span>
        <p class="value">{{ envData.data.wind_speed ? envData.data.wind_speed : '10' + 'M/s' }}</p>
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
  height: 30%;
  position: absolute;
  background-color: var(--screen-card-color);
  top: 38%;
  border-radius: 15px;
  padding-top: 1%;
  // box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;

  .line {
    margin-left: 7%;
    margin-bottom: 2%;
    color: var(--font-level-1);
  }
  .chart-wrapper {
    width: 100%;
    flex: 1;
    margin-top: -2%;
    display: flex;
    justify-content: space-around;
    color: var(--font-level-2);
    .chart-air {
      width: 40%;
      height: 100%;
      position: relative;
      .title {
        position: absolute;
        top: -4%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1em;
      }
    }
    .chart-noise {
      width: 40%;
      height: 100%;
      position: relative;

      .title {
        position: absolute;
        top: -4%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1em;
      }
    }
  }
  .data-wrapper {
    position: absolute;
    bottom: 2%;
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 0.8em;
    color: var(--font-level-2);
    .data {
      width: 24%;
      display: flex;
      height: 60%;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      p {
        margin: 0;
        font-size: 0.9em;
        color: var(--font-level-11);
      }
      .iconfont {
        margin-right: 2%;
        font-size: 1.2em;
        color: var(--font-level-11);
      }
    }
    .tem {
      background-color: #f7ea8e;
    }
    .hum {
      background-color: #b0edef;
    }
    .wind {
      background-color: #aefdae;
    }
  }
}
</style>
