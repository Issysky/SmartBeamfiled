<!-- 拌合站信息 大屏组件 -->
<template>
    <div class="mix-station-wrapper">
      <Line class="line" :width="'80%'" :label="'拌合站信息'"></Line>
      <FormMix></FormMix>
    </div>
  </template>
  
  <script setup lang="js">
  import { ref, onMounted, onBeforeMount, reactive } from 'vue'
  import Line from '../Line.vue'
  import FormMix from './FormMix.vue'
  </script>
  <style scoped lang="less">
  .mix-station-wrapper {
    width: 20%;
    height: 58%;
    position: absolute;
    right: 2%;
    top:10%;
    padding-top: 1%;
    // background-color: #cdd0d6;
    border-radius: 15px;
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: column;
    color:var(--screen-font-color);
    .line{
      padding-left: 8%;
    }
  }
  </style>
  