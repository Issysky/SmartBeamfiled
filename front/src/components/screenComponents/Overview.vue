<!-- 大屏概况组件 -->
<template>
  <div class="overview-wrapper">
    <div class="overview">
      <p class="title">梁场概况</p>
      <div class="info" v-for="item in yamlData.data" :key="item.label">
        <img src="" alt="" />
        <p class="label">{{ item.label }}</p>
        <p class="text">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted,onBeforeMount,reactive } from 'vue'
import { load } from 'js-yaml'

const yamlData = reactive({
    data:[]
})

onMounted(async () => {
  const response = await fetch('/src/assets/yaml/overview.yaml')
  yamlData.data = load(await response.text()).arr
  console.log(yamlData)
  setTimeout(() => {
    yamlData.data.push({
        label: '测试',
        text: '测试'
    })
  }, 3000);
})
// onBeforeMount(async () => {
//   const response = await fetch('/src/assets/yaml/overview.yaml')
//   yamlData.value = load(await response.text())
// })
</script>
<style scoped lang="less">
.overview-wrapper {
  width: 32%;
  height: 28%;
  background-color: #cdd0d6;
  border-radius: 15px;
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
      font-size: 2.4em;
      font-weight: bold;
      margin: 0;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 2%;
    }
    .info {
      width: 90%;
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
        font-size: 2em;
      }
    }
  }
}
</style>
