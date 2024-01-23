<!-- 拌合站信息 大屏组件 -->
<template>
    <div class="mix-station-wrapper">
      <Line :width="'60%'" :label="'拌合站信息'"></Line>
    </div>
  </template>
  
  <script setup lang="js">
  import { ref, onMounted, onBeforeMount, reactive } from 'vue'
  import Line from '../Line.vue'
  </script>
  <style scoped lang="less">
  .mix-station-wrapper {
    width: 22%;
    height: 44%;
    position: absolute;
    right: 2%;
    top:10%;
    padding-left: 2%;
    padding-top: 1%;
    background-color: #cdd0d6;
    border-radius: 15px;
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: column;
  }
  </style>
  