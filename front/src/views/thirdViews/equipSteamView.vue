<!-- 三级路由 蒸养棚 -->
<template>
  <div class="equip-steam-wrapper">
    <Monitor v-if="monitorStore.isShow" />
    <!-- 日期时间选择器 -->
    <div class="block">
      <el-date-picker
        v-model="timeRange"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="截止时间"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY/MM/DD ddd"
        time-format="A hh:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        editable="false"
        @change="handle"
      />
    </div>
    <!--卡片区域  -->
    <div class="card-wrapper">
     <CardType1 />
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useEquipSteamStore } from '../../stores/equipSteam.js'
import CardType1 from '../../components/CardType1.vue'
import Monitor from '@/components/Monitor.vue';
import { useMonitorStore } from '@/stores/monitor';


//定义时间范围
const timeRange = ref('')

//  引入store
const equipSteamStore = useEquipSteamStore()
const monitorStore = useMonitorStore()
// 定义isActive,控制按钮的样式
const isActive = ref(true)

const handle = () => {}
onMounted(() => {
  console.log(equipSteamStore.equipSteamData, 'equipStore.equipSteamData')

})
</script>
<style scoped lang="less">
.equip-steam-wrapper {
  width: 100%;
  height: 100%;
  .block {
    width: 40vw;
    height: 8%;
    margin-left: 4vw;
    // background-color: aqua;
  }
  .card-wrapper {
    width: 100%;
    height: 88vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-around;
   
  }
}
</style>
