<!-- 三级路由 蒸养棚 -->
<template>
  <div class="equip-steam-wrapper">
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
import { useEquipStore } from '../../stores/equip.js'
import CardType1 from '../../components/CardType1.vue'

//定义时间范围
const timeRange = ref('')

//  引入store
const equipStore = useEquipStore()
// 定义isActive,控制按钮的样式
const isActive = ref(true)

const handle = () => {}
onMounted(() => {
  console.log(equipStore.equipSteamData, 'equipStore.equipSteamData')

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
