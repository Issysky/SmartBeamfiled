<!-- 大屏概况组件 -->
<template>
  <div class="overview-wrapper">
    <div class="overview">
      <Line class="line" :width="'60%'" :label="'项目概况'"></Line>
      <div class="product-info" v-for="item in yamlData.data" :key="item.label">
        <img src="" alt="" />
        <p class="label">{{ item.label + ':' }}</p>
        <p class="text">{{ item.text }}</p>
      </div>
      <div class="beam-info">
        <img src="" alt="" />
        <p class="label">制梁任务:</p>
        <p class="text">1750片</p>
        <img src="" alt="" />
        <p class="label">已制梁:</p>
        <p class="text">865片</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import { load } from 'js-yaml'
import Line from '../Line.vue'

const yamlData = reactive({
  data: [
    {
      label: '项目名称',
      text: '宁上智慧高速'
    },
    {
      label: '项目标段',
      text: '宁上高速霞浦至福安段A4合同段'
    },
    {
      label: '项目位置',
      text: '福建省宁德市霞浦县'
    }
  ]
})

onMounted(async () => {
  // const response = await fetch('/src/assets/yaml/screen.yaml')
  // yamlData.data = load(await response.text()).arr
})
</script>
<style scoped lang="less">
.overview-wrapper {
  width: 22%;
  height: 26%;
  position: absolute;
  top: 10%;
  // background-color: #cdd0d6;
  color:var(--screen-font-color);
  border-radius: 15px;
  // box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
  border: 1px solid #409EFF;
  .overview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 2%;
    .title {
      width: 90%;
      color: var(--screen-font-color);
      font-size: 1.5em;
      font-weight: bold;
      margin: 0;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 2%;
    }
    .line {
      margin-left: -30%;
      margin-bottom: 2%;
    }
    .product-info {
      width: 100%;
      height: 15%;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
      p {
        color: var(--screen-font-color);
        margin: 0;
        font-size: 0.7em;
      }
      .label {
        width: 20%;
      }
      .text {
        width: 60%;
      }
    }
    .beam-info {
      width: 100%;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
      p {
        color: var(--screen-font-color);
        margin: 0;
        font-size: 0.7em;
      }
      .label {
        width: 18%;
      }
      .text {
        width: 20%;
        margin-right: 5%;
      }
    }
  }
}
</style>
