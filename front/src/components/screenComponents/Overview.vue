<!-- 大屏概况组件 -->
<template>
  <div class="overview-wrapper">
    <div class="overview">
      <p class="title">梁场概况</p>
      <Line class="line" :width="'60%'"></Line>
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
  data: []
})

onMounted(async () => {
  const response = await fetch('/src/assets/yaml/screen.yaml')
  yamlData.data = load(await response.text()).arr
  // setTimeout(() => {
  //   yamlData.data.push({
  //       label: '测试',
  //       text: '测试'
  //   })
  // }, 3000);
  // const path = "/src/assets/yaml/overview.yaml"
  // window.rwYaml.readYamlFile(path)
})
</script>
<style scoped lang="less">
.overview-wrapper {
  width: 28%;
  height: 22%;
  position: absolute;
  background-color: #cdd0d6;
  border-radius: 15px;
  box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
  .overview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 2%;
    .title {
      width: 90%;
      color: #303133;
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
        color: #303133;
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
      width:100% ;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
      p {
        color: #303133;
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
