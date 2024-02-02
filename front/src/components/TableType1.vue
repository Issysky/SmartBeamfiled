<!-- 图表模板1 设备管理 拌合站数据 -->
<template>
  <!-- 表格外框 -->
  <div class="table-mix-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper">
        <!-- 过滤器 -->
        <div class="filter">
          <div class="time-select">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :size="size"
            />
          </div>
          <input type="text" class="strength-grade" placeholder="强度等级" />
          <input type="text" class="mixing-station-code" placeholder="设备编号" />
          <input type="text" class="pouring-position" placeholder="浇筑部位" />
          <el-select v-model="value" class="m-2" placeholder="Select" style="width: 240px">
            <el-option
              v-for="item in excessGrade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <!-- 表格主体 -->
      <div class="table"></div>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="currentPage"
          @change="console.log(currentPage)"
          :total="1000"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useEquipMixStore } from '@/stores/equipMix'

// 引入store
const equipMixStore = useEquipMixStore()

const currentPage = ref(1)

const excessGrade = [
  { label: '一级', value: 1 },
  { label: '二级', value: 2 },
  { label: '三级', value: 3 },
  { label: '四级', value: 4 },
  { label: '五级', value: 5 }
]

// 根据筛选获得参数
const getParams = (time, strengthGrade) => {
  return {
    currentPage: currentPage.value,
    pageSize: 10
  }
}

onMounted(() => {
  equipMixStore.getMixData()
})
</script>
<style scoped lang="less">
.table-mix-wrapper {
  width: 98%;
  height: 87%;
  background-color: #fff;
  padding: 0 1%;

  .table-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .top-wrapper {
      width: 100%;
      height: 10%;
      background-color: #bfc;
      .filter {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .time-select {
          width: 20%;
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
    .table {
      width: 100%;
      height: 80%;
      background-color: #f5f5f5;
    }
    .pagination {
      width: 90%;
      height: 10%;
      background-color: #bfc;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
