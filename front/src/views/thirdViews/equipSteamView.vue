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
      <div class="card" v-for="(item, index) in 4">
        <!-- 标题 -->
        <p class="label">一号蒸养棚</p>
        <!-- 左侧区域 -->
        <div class="left-wrapper">
          <!-- <img src="" alt=""> -->
          <!-- 是否开门的占位符 -->
          <span>{{ equipStore.equipSteamData[0].door[0] ? '开门' : '关门' }}</span
          ><span>{{ equipStore.equipSteamData[0].door[0] ? '大开门' : '关门' }}</span>
          <el-button>一键蒸养</el-button>
        </div>
        <!-- 右侧区域 -->
        <div class="right-wrapper">
          <!-- 切换数据和控制的按钮 -->
          <div class="switch-btn">
            <button @click="isActive = !isActive" :class="{ active: isActive }">数据</button>
            <button @click="isActive = !isActive" :class="{ active: !isActive }">控制</button>
          </div>
          <div class="data" v-if="isActive">
            <p class="label">24小时温湿度曲线</p>
            <div class="chart">温湿度曲线</div>
            <div class="info">
              <p>实时温度</p>
              <p>实时湿度</p>
              <p>蒸汽阀状态</p>
              <p>水阀状态</p>
            </div>
          </div>
          <div class="contral" v-else>
            <p class="label">阀门控制</p>
            <div class="btn-wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useEquipStore } from '../../stores/equip.js'

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
    .card {
      width: 44%;
      height: 36%;
      background-color: #fff;
      margin-bottom: 2%;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .label {
        font-size: 1em;
        width: 100%;
        text-align: center;
        margin: 0 auto;
      }
      .left-wrapper {
        width: 35%;
        height: 80%;
        background-color: #bfc;
      }
      .right-wrapper {
        width: 60%;
        height: 80%;
        background-color: #bfc;
        position: relative;
        .switch-btn {
          position: absolute;
          right: 0;
          width: 44%;
          height: 10%;
          border-radius: 15px;
          background-color: #333;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          button {
            width: 45%;
            height: 80%;
            font-size: 0.8em;
            background-color: transparent;
            border-radius: 15px;
            border: none;
            overflow: visible;
            white-space: nowrap;
            cursor: pointer;
            color: var(--HeaderFontColor);
          }
          .active {
            background-color: #fff;
            color: #333;
          }
        }
        .data {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          .label {
            width: 100%;
            height: 12%;
            font-size: 0.8em;
            text-align: left;
          }
          .chart {
            width: 100%;
            height: 80%;
          }
          .info {
            width: 100%;
            height: 20%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            align-content: flex-start;
            p {
              width: 50%;
              margin: 0;
              font-size: 0.8em;
            }
          }
        }
        .contral {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          .label {
            width: 100%;
            height: 12%;
            font-size: 0.8em;
            text-align: left;
          }
          .btn-wrapper{
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            align-content: flex-start;
            background-color: #1e4570;
          }
        }
      }
    }
  }
}
</style>
