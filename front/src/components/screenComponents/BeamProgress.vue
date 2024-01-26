<!-- 制梁任务和架桥任务的进度条组件 出现在大屏项目概况的卡片中 -->
<template>
  <div class="beam-progress-wrapper">
    <div class="label">
      <span class="iconfont" :class="icon"></span>
      <p>{{ label + ':' }}</p>
    </div>
    <div class="progress">
      <div class="total">
        <div class="complate" :style="{ width: getComplate(),backgroundColor:props.color }"></div>
      </div>
      <div class="value">{{ complate + '/' + total + '片' }}</div>
    </div>
  </div>
</template>

<script setup lang="js">
import { defineProps } from 'vue'
const props = defineProps({
  total: {
    default: 0
  },
  label: {
    default: ''
  },
  complate: {
    default: 0
  },
  icon: {
    default: ''
  },
  color: {
    default: '#f7ea8e'
  }
})

const getComplate = () => {
  return (props.complate / props.total) * 100 + '%'
}
</script>
<style scoped lang="less">
.beam-progress-wrapper {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.7em;
  .label {
    width: 30%;
    height: 100%;
    color: var(--font-level-2);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 6%;
    .iconfont{
        margin-right: 10%;
    }
  }
  .progress {
    flex: 1;
    height: 60%;
    border-radius: 15px;
    display: flex;
    background-color: #ffffff66;
    justify-content: flex-start;
    position: relative;
    .total {
      width: 100%;
      overflow: hidden;
      border-radius: 15px;
      .complate {
        width: 50%;
        height: 100%;
        // background-color: #f7ea8e;
        border-radius: 15px;
      }
    }
    .value {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: auto;
      height: 100%;
      color: var(--font-level-2);
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 3%;
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>
