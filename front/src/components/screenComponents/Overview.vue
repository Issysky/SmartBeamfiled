<!-- 大屏概况组件 -->
<template>
  <div class="overview-wrapper">
    <div class="overview">
      <!-- 基本信息 -->
      <Line class="line" :width="'60%'" :label="'项目概况'"></Line>
      <div class="product-info" v-for="item in overviewStore.projectInfo.data" :key="item.label">
        <span class="iconfont" :class="`icon-${item.icon}`"></span>
        <p class="label">{{ item.title + ':' }}</p>
        <p class="text">{{ item.content }}</p>
      </div>
      <!-- 制梁计划 -->
      <div class="beam-info-wrapper">
        <!-- <div class="beam-info" v-for="(item, index) in overviewStore.planInfo.data" :key="index">
          <span class="iconfont" :class="item.icon"></span>
          <p class="label">{{ item.title }}:</p>
          <p class="text">{{ item.value + '片' }}</p>
        </div> -->
        <div class="beam-progress">
          <BeamProgress :total="1000" :label="'制梁进度'" :complate="220" :icon="overviewStore.planInfo.data[0]?.icon" :color="'#f7ea8e'"></BeamProgress>
        </div>
        <div class="beam-progress">
          <BeamProgress :total="1000" :label="'架桥进度'" :complate="220" :icon="overviewStore.planInfo.data[1]?.icon" :color="'#b0edef'"></BeamProgress>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import { load } from 'js-yaml'
import Line from '../Line.vue'
import { useOverviewStore } from '../../stores/overview.js'
import BeamProgress from './BeamProgress.vue'

const overviewStore = useOverviewStore()

onMounted(async () => {
  // 获取项目基本信息和制梁计划
  overviewStore.getProjectInfo()
  overviewStore.getProjectPlan()
})
</script>
<style scoped lang="less">
.overview-wrapper {
  width: 22%;
  height: 26%;
  position: absolute;
  top: 10%;
  background-color: var(--screen-card-color);
  border-radius: 15px;
  // background-image: radial-gradient(circle at center, #282E46, #3D445C);
  box-shadow: 0 0 15px 0 #00000095;
  .overview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 2%;

    .line {
      margin-left: -30%;
      margin-bottom: 2%;
      color: var(--font-level-1);
    }
    .product-info {
      width: 100%;
      height: 16%;
      display: flex;
      align-items: center;
      color: var(--font-level-2);
      margin-left: 10%;
      img {
        width: 30px;
        height: 30px;
      }
      p {
        margin: 0;
        font-size: 0.7em;
      }
      .iconfont {
        font-size: 1em;
        margin-left: 5%;
      }
      .label {
        margin-left: 2%;
        width: 20%;
      }
      .text {
        width: 70%;
      }
    }
    .beam-info-wrapper {
      width: 100%;
      height: 24%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--font-level-2);
      margin-left: 10%;
      .beam-info {
        width: 50%;
        display: flex;
        align-items: center;
        margin-left: 5%;
        p {
          margin: 0;
          font-size: 0.7em;
        }
        .iconfont {
          font-size: 1em;
        }
        .label {
          width: auto;
          margin-left: 5%;
        }
        .text {
          width: 20%;
          margin-right: 5%;
        }
      }
      .beam-progress {
        width: 90%;
        height: 50%;
      }
    }
  }
}
</style>
