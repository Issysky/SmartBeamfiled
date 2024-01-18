<!-- 卡片弹窗组件2 出现在生产计划 -->
<template>
  <div class="plan-card-wrapper">
    <!-- 遮罩 -->
    <div class="mask"></div>
    <div class="card">
      <button class="close" @click="closeCard()">X</button>
      <!-- 卡片内容区 -->
      <div class="content">
        <!-- 左侧区域 已有计划 可删除 -->
        <div class="left">
          <p class="label">已有计划</p>
          <ul>
            <li
              class="planed"
              v-for="(item, index) in productionPlanStore.planedList.value?.results"
              :key="index"
            >
              <p>{{ item.beam_name }}</p>
              <!-- 删除数据 -->
              <div @click="deletePlan(item.id)">
                <el-icon><SemiSelect /></el-icon>
              </div>
            </li>
          </ul>
        </div>
        <!-- 右侧区域 -->
        <div class="right">
          <div class="top">
            <p class="label">新增计划</p>
            <ul>
              <li
                v-for="(value, key, index) in unPlan.value"
                :key="index"
                :class="{ active: active[index].active }"
                @click="changeActive(index, key)"
              >
                {{ key }}
              </li>
            </ul>
          </div>
          <div class="bottom">
            <div class="checkbox-wrapper">
              <el-checkbox
                v-for="item in planList.value"
                :key="item.id"
                :label="item.beam_name"
                size="large"
                @click="handleAddPlanList(item.id)"
                border
              />
            </div>
            <el-button type="info" @click="addPlan()">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { useProductionPlanStore } from '@/stores/production_plan'
import { ref } from 'vue'

// 定义生产计划store
const productionPlanStore = useProductionPlanStore()

// 定义计划卡片左侧导航
const active = ref([
  {
    active: false,
    name: ''
  },
  { active: false, name: '' }
])
// 定义未计划数组
let unPlan = reactive({})
// 定义可添加计划列表
const planList = reactive([])
// 定义即将添加计划列表
const addPlanList = ref([])

// 删除计划
const deletePlan = (id) => {
  productionPlanStore.delPlanedList(id)
  addPlan()
  console.log('删除计划')
}
// 点击按钮切换状态
const changeActive = (index, name) => {
  active.value[index].active = !active.value[index].active
  active.value[index].name = active.value[index].active ? name : ''
  handlePlanList()
}
// 处理可添加计划数据
const handlePlanList = () => {
  let arr = []
  let i = 0
  for (let key in unPlan.value) {
    if (active.value[i].name === key) {
      arr.push(...unPlan.value[key])
    }
    i++
  }
  planList.value = arr
}
//修改即将添加数组
const handleAddPlanList = (id) => {
  if (!addPlanList.value.includes(id)) {
    addPlanList.value.push(id)
  } else {
    addPlanList.value.splice(addPlanList.value.indexOf(id), 1)
  }
}
// 添加计划方法
const addPlan = async () => {
  // 先把计划添加进已有计划列表
  addPlanList.value.forEach((item, index) => {
    const data = {
      date: productionPlanStore.time,
      beam_code_id: item
    }
    // 发请求
    productionPlanStore.addPlanedList(data)
  })
  // 重新获取已有计划列表
  productionPlanStore.getPlanedList().then((res) => {
    // 重新获取未计划列表
    unPlan.value = productionPlanStore.planedList.value.rest_beam
    handlePlanList()
    // 添加数组清空
    addPlanList.value = []
    // 日历显示数据
    productionPlanStore.getCalenderPlan()
  })
}

// 关闭卡片
const closeCard = () => {
  productionPlanStore.changeShow(false)
  addPlan()
}
onMounted(async () => {
  await productionPlanStore.getPlanedList()
  unPlan.value = productionPlanStore.planedList.value.rest_beam
})
</script>
<style scoped lang="less">
.plan-card-wrapper {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .card {
    width: 800px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    .close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
      cursor: pointer;
      border: none;
      color: red;
      background-color: transparent;
    }
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      .left {
        width: 40%;
        height: 100%;
        background-color: #ccc;
        ul {
          height: 90%;
          list-style: none;
          padding: 0;
          margin: 0;
          overflow-y: auto;
          .planed {
            height: 40px;
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #333;
            div {
              width: 40px;
              height: 40px;
              line-height: 45px;
              text-align: center;
              color: #f56c6c44;
              margin-right: -40px;
              font-size: 2em;
              cursor: pointer;
              transition: all 0.3s;
              &:hover {
                color: #f56c6c;
              }
            }
          }
        }
      }
      .right {
        flex: 1;
        height: 100%;
        background-color: #eee;
        .top {
          width: 100%;
          height: 18%;
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            li {
              width: 100px;
              height: 35px;
              text-align: center;
              line-height: 35px;
              cursor: pointer;
              color: #000;
              border-right: 1px solid #eee;
              background-color: #fff;
              border-radius: 15px;
            }
            .active {
              background-color: #f56c6c;
              color: #fff;
            }
          }
        }
        .bottom {
          width: 90%;
          height: 70%;
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          .checkbox-wrapper {
            width: 100%;
            height: 90%;
            overflow-y: auto;
            overflow-x: hidden;
            margin-bottom: 12px;
            .el-checkbox {
              width: 100%;
            }
          }
          button {
            width: 60px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
