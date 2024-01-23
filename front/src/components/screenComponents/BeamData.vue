<!-- 制梁数据 -->

<template>
    <div class="beam-data-wrapper">
      <Line :width="'60%'" :label="'制梁数据'"></Line>
    </div>
  </template>
  
  <script setup lang="js">
  import { ref, onMounted, onBeforeMount, reactive } from 'vue'
  import Line from '../Line.vue'
  


  </script>
  <style scoped lang="less">
  .beam-data-wrapper {
    width: 45%;
    height: 34%;
    position: absolute;
    top: 59%;
    right: 27%;
    padding-left: 2%;
    padding-top: 1%;
    // background-color: #cdd0d6;
    background-color: transparent;
    border-radius: 15px;
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: column;
  }
  </style>
  