<!-- 有害气体二级路由左上角 最新数据 可以切换 -->
<template>
  <div class="gas-model-wrapper">
    <div class="select-wrapper">
      <el-select v-model="area" class="m-2" placeholder="Select" size="small" @change="equipGasStore.getGasData(area)">
        <el-option
          v-for="item in areaArr"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="content-wrapper">
      <div class="item" v-for="(item, index) in 4" :key="index">
        <p class="label">一氧化碳(CO)</p>
        <p class="value">0.00%</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, reactive } from 'vue'
import { useEquipGasStore } from '@/stores/equipStore/equipGas'

// 选择区域
const area = ref('')
// 区域数组
const areaArr = reactive([
  {
    value: '右洞监测',
    name: '右洞监测'
  },
  {
    value: '右洞监测',
    name: '右洞监测'
  },
  {
    value: '右洞监测',
    name: '右洞监测'
  },
  {
    value: '右洞监测',
    name: '右洞监测'
  }
])
// 获取store
const equipGasStore = useEquipGasStore()
</script>
<style scoped lang="less">
.gas-model-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .select-wrapper {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .content-wrapper {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .item {
      width: 30%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      background-color: #bfc;
      .label {
        font-size: 1.8em;
        font-weight: bold;
      }
      .value {
        font-size: 1em;
        font-weight: bold;
      }
    }
  }
}
</style>
