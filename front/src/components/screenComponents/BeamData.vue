<!-- 制梁数据 -->

<template>
    <div class="beam-data-wrapper">
      <Line class="line" :width="'60%'" :label="'制梁数据'"></Line>
      <FormBeam></FormBeam>
    </div>
  </template>
  
  <script setup lang="js">
  import { ref, onMounted, onBeforeMount, reactive } from 'vue'
  import Line from '../Line.vue'
  import FormBeam from './FormBeam.vue';

  </script>
  <style scoped lang="less">
  .beam-data-wrapper {
    width: 45%;
    height: 21%;
    position: absolute;
    top: 72%;
    right: 23%;
    padding-top: 1%;
    // background-color: #cdd0d6;
    color:var(--screen-font-color);
    border-radius: 15px;
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: column;
    .line {
      margin-left: 3%;
    }
  }
  </style>
  