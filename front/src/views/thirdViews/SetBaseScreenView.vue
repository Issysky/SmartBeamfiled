<!-- 三级路由大屏设置,从属于二级路由设置菜单 -->
<template>
  <div class="setting-screen-wrapper">
    <!-- 大屏概况 -->
    <div class="overview-setting">
      <p class="title">项目概况</p>
      <div class="content">
        <p class="label">标题1:</p>
        <input type="text" class="input" v-model="info1_title" />
        <p class="label">文本1:</p>
        <input type="text" class="input" v-model="info1_content" />
        <p class="label">图标1:</p>
        <input type="text" class="input" v-model="info1_img" />
      </div>
      <div class="content">
        <p class="label">标题2:</p>
        <input type="text" class="input" v-model="info2_title" />
        <p class="label">文本2:</p>
        <input type="text" class="input" v-model="info2_content" />
        <p class="label">图标2:</p>
        <input type="text" class="input" v-model="info2_img" />
      </div>
      <div class="content">
        <p class="label">标题3:</p>
        <input type="text" class="input" v-model="info3_title" />
        <p class="label">文本3:</p>
        <input type="text" class="input" v-model="info3_content" />
        <p class="label">图标3:</p>
        <input type="text" class="input" v-model="info3_img" />
      </div>
      <button class="confirm" @click="confirmOverview">提交</button>
    </div>
    <!-- 大屏环境监测 -->
    <div class="env-setting">
      <p class="title">环境监测</p>
      <div class="content">
        <p class="label">监测点名称:</p>
        <input type="text" class="input" v-model="envName" />
      </div>
      <button class="confirm" @click="confirmEnv">提交</button>
    </div>
    <!-- 大屏视频选择 -->
    <div class="video-setting">
      <p class="title">视频选择</p>
      <div class="select">
        <input
          type="file"
          id="fileInput"
          accept="video/*"
          @change="settingMenuStore.getScreenVideoUrl"
        />
        <label for="fileInput" class="custom-file-upload">选择视频</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import { useSettingMenuStore } from '../../stores/settingMenu.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useEnvStore } from '../../stores/environment.js'

// 引入store
const settingMenuStore = useSettingMenuStore()
const envStore = useEnvStore()

// 定义数据
const info1_title = ref('公司名称1')
const info1_content = ref('中建三局路桥公司')
const info1_img = ref('company_name')
const info2_title = ref('项目标段')
const info2_content = ref('青银二广联络线')
const info2_img = ref('lot')
const info3_title = ref('项目位置')
const info3_content = ref('荥阳市xx县xx村')
const info3_img = ref('address')

const envName = ref('测试一号机')

//   提交概况修改
const confirmOverview = () => {
  const body = {
    info1_content: info1_content.value,
    info1_title: info1_title.value,
    info1_img: info1_img.value,
    info2_title: info2_title.value,
    info2_content: info2_content.value,
    info2_img: info2_img.value,
    info3_content: info3_content.value,
    info3_title: info3_title.value,
    info3_img: info3_img.value
  }
  ElMessage.success('提交成功')
  settingMenuStore.changeScreenInfo(body)
  //   清空输入框
//   info1_title.value = ''
//   info1_content.value = ''
//   info1_img.value = ''
//   info2_title.value = ''
//   info2_content.value = ''
//   info2_img.value = ''
//   info3_title.value = ''
//   info3_content.value = ''
//   info3_img.value = ''
}

// 提交环境监测修改
const confirmEnv = () => {
  envStore.changeEnvParams(envName.value)
  ElMessage.success('提交成功')
  envName.value = ''
}
</script>
<style scoped lang="less">
.setting-screen-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .overview-setting {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 30px;
    margin-bottom: 15px;
    .title {
      width: 30%;
      font-size: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .label {
        text-align: right;
        margin-right: 20px;
      }
      .input {
        width: 130px;
        height: 30px;
        margin-right: 10px;
      }
    }
    .confirm {
      width: 100px;
      height: 30px;
      background-color: var(--color-primary);
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .env-setting {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      width: 30%;
      font-size: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .label {
        text-align: right;
        margin-right: 20px;
      }
      .input {
        width: 200px;
        height: 30px;
      }
    }
    .confirm {
      width: 100px;
      height: 30px;
      background-color: var(--color-primary);
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .video-setting {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
      width: 30%;
      font-size: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .select {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      input {
        // display: none;
      }
      .custom-file-upload {
        width: 140px;
        height: 30px;
        font-size: 0.8em;
        background-color: #4caf50;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        width: 80px;
        display: none;
      }
    }
  }
}
</style>
