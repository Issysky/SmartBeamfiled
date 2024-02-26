<!-- 有害气体表格  出现在设备管理,有害气体页面-->
<template>
  <div class="form-gas-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper">
      </div>
      <!-- echarts图表 -->
      <div class="echart-wrapper">
        <div class="chart1">
          <GasModel/>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import GasModel from '@/components/equipComponents/GasModel.vue'
</script>
<style scoped lang="less">
.form-gas-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .table-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top-wrapper {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .btn-wrapper {
        display: flex;
        align-items: center;
        .btn {
          margin-left: 20px;
        }
      }
    }
    .echart-wrapper {
      width: 100%;
      height: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      .chart1 {
        width: 50%;
        height: 100%;
      }
    }
  }
}
</style>
