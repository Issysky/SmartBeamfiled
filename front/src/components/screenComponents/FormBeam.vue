<!-- 制梁数据表格 -->
<template>
  <div class="table-wrapper">
    <div class="label-wrapper">
      <div
        class="label"
        v-for="(item, index) in formBeamStore.tableData.label"
        :style="{ width: formBeamStore.tableData.width[index] }"
        :key="index"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="data-wrapper">
      <div class="data" v-for="(item, index) in formBeamStore.tableData.data" :key="index" :style="{backgroundColor:index%2==1?'#597ef7':''}">
        <div
          class="data1"
          :title="item.beam_name"
          :style="{ width: formBeamStore.tableData.width[0] }"
        >
          {{ item.beam_name }}
        </div>
        <div
          class="data2"
          :title="item.beam_type"
          :style="{ width: formBeamStore.tableData.width[1] }"
        >
          {{ item.beam_type }}
        </div>
        <div
          class="data3"
          :style="{
            width: formBeamStore.tableData.width[2]
          }"
        >
          {{ item.bind_start_time }}
        </div>
        <div
          class="data4"
          :style="{
            width: formBeamStore.tableData.width[3]
          }"
        >
          {{ item.steam_start_time }}
        </div>
        <div
          class="data5"
          :style="{
            width: formBeamStore.tableData.width[4]
          }"
        >
          {{ item.steam_end_time }}
        </div>
        <div
          class="data6"
          :style="{
            width: formBeamStore.tableData.width[5]
          }"
        >
          {{ item.grouting_end_time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useFormBeamStore } from '@/stores/formBeam'

const formBeamStore = useFormBeamStore()

onMounted(() => {
  formBeamStore.getTableData()
})
</script>
<style scoped lang="less">
.table-wrapper {
  width: 100%;
  height: 70%;
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .label-wrapper {
    width: 95%;
    height: 8%;
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    color: var(--font-level-2);
    .label {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.7em;
      font-weight: 600;
    }
  }
  .data-wrapper {
    width: 95%;
    height: 90%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: var(--font-level-3);
    .data {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #000;
      padding-top: 4px;
      padding-bottom:5px;
      div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 0.6em;
      }
    }
  }
}
</style>
