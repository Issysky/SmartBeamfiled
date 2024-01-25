<!-- 拌合站数据表格 -->
<template>
  <div class="table-wrapper">
    <div class="label-wrapper">
      <div
        class="label"
        v-for="(item, index) in formMixStore.tableData.label"
        :style="{ width: formMixStore.tableData.width[index],marginRight:index==0?'25px':'0' }"
        :key="index"
        
      >
        {{ item.label }}
      </div>
    </div>
    <div class="data-wrapper">
      <!-- 只取出前六条数据 -->
      <div
        class="data"
        v-for="(item, index) in formMixStore.tableData.data.slice(0, 7)"
        :key="index"
        :style="{ backgroundColor: index % 2 == 1 ? '#597ef7' : '' }"
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
            width: formMixStore.tableData.width[2],
            backgroundImage: getExcessData(item.ExcessGrade).img?`url(${getExcessData(item.ExcessGrade).img})`:'' ,
          }"
        >
          {{ getExcessData(item.ExcessGrade).text?getExcessData(item.ExcessGrade).text:'' }}
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
      text: '无',
    }
  } else if (data === 1) {
    return {
      img:'/src/assets/img/screenImg/数字1.svg'
    }
  } else if (data === 2) {
    return {
      img:'/src/assets/img/screenImg/数字2.svg'
    }
  }else if (data === 3) {
    return {
      color: '#F56C6C',
      img:'/src/assets/img/screenImg/数字3.svg'
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
    width: 95%;
    height: 8%;
    display: flex;
    flex-direction: row;
    margin-bottom: 2%;
    color: var(--font-level-2);
    .label {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: .7em;
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
      padding-bottom: 8px;
      padding-top: 8px;
      color: var(--font-level-3);
      div {
        font-size: 0.6em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
      }
      .data1 {
        margin-right: 25px;
        cursor:default;
      }
      .data2 {
        cursor:default;
      }
      .data3 {
        text-align: center;
        background-repeat:no-repeat ;
        background-size:contain ;
        background-position:center;
      }
    }
  }
}
</style>
