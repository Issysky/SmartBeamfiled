<!-- 拌合站数据表格 -->
<template>
  <div class="table-wrapper">
    <div class="label-wrapper">
      <div
        class="label"
        v-for="(item, index) in formMixStore.tableData.label"
        :style="{ width: formMixStore.tableData.width[index] }"
        :key="index"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="data-wrapper">
      <div
        class="data"
        v-for="(item, index) in formMixStore.tableData.data.slice(0, 12)"
        :key="index"
        :style="{ backgroundColor: index % 2 == 1 ? '#99a9bf' : '' }"
      >
        <div class="data1" :title="item.TaskId" :style="{ width: formMixStore.tableData.width[0] }">
          {{ item.TaskId }}
        </div>
        <div
          class="data2"
          :title="item.PouringPosition"
          :style="{ width: formMixStore.tableData.width[1] }"
        >
          {{ item.PouringPosition }}
        </div>
        <div
          class="data3"
          :style="{
            color: getExcessData(item.ExcessGrade).color,
            width: formMixStore.tableData.width[2]
          }"
        >
          {{ getExcessData(item.ExcessGrade).text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useFormMixStore } from '@/stores/formMix'

const formMixStore = useFormMixStore()

const getExcessData = (data) => {
  if (data === 0) {
    return {
      color: '#67C23A',
      text: '无超标'
    }
  } else if (data === 1) {
    return {
      color: '#E6A23C',
      text: '一级超标'
    }
  } else if (data === 2) {
    return {
      color: '#F56C6C',
      text: '二级超标'
    }
  }
  return {
    color: '#67C23A',
    text: '无超标'
  }
}

onMounted(() => {
  formMixStore.getTableData()
})
</script>
<style scoped lang="less">
.table-wrapper {
  width: 100%;
  height: 90%;
  padding-left: 2%;
  color:var(--screen-font-color);
  .label-wrapper {
    width: 100%;
    height: 8%;
    display: flex;
    flex-direction: row;
    margin-bottom: 2%;
    .label {
      width: 33%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .data-wrapper {
    width: 95%;
    height: 90%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .data {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #000;
      padding-bottom: 8px;
      padding-top: 8px;
      div {
        font-size: 0.8em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
      }
      .data1 {
        width: 33%;
        margin-right: 5px;
      }
      .data2 {
        width: 33%;
      }
      .data3 {
        width: 33%;
      }
    }
  }
}
</style>
