<!-- 登陆页面 打开应用后的第一个页面-->
<template>
  <div class="login-wrapper" ref="loginWrapper">
    <div class="drag"></div>
    <div class="close" @click="topBarStore.handleClose()">
      <el-icon><Close /></el-icon>
    </div>
    <div class="minimize" @click="topBarStore.handleMini()">
      <el-icon><Minus /></el-icon>
    </div>
    <!-- 登陆卡片 -->
    <div class="card-wrapper">
      <!-- 标题框 -->
      <div class="label-wrapper">
        <!-- 标题 -->
        <p class="label">欢迎登陆系统</p>
        <!-- 英文 -->
        <p class="eng">WELCOME</p>
      </div>
      <!-- 账号密码框 -->
      <div class="input-wrapper">
        <el-input class="userInput" v-model="username" placeholder="请输入用户名" />
        <el-input class="pwdInput" show-password v-model="pwd" placeholder="请输入密码" />
        <!-- 记住密码 -->
        <div class="remember-pwd">
          <el-checkbox v-model="rememberPwd" label="记住密码" size="large" />
        </div>
      </div>
      <!-- 登陆 -->
      <el-button class="login-btn" @click="login(username, pwd)" type="primary">登录</el-button>
      <el-alert v-if="alert" title="用户名或密码错误" type="error" @close="alert = false" />
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'
import TopBarLogin from '../components/TopBarLogin.vue'
import { usetopBarStore } from '@/stores/topBar'

// 定义记住密码参数
const rememberPwd = ref(false)
// 定义路由
const router = useRouter()
// 定义userstore
const userStore = useUserStore()
const topBarStore = usetopBarStore()
// 定义用户名和密码
const username = ref('')
const pwd = ref('')
// 错误提示框
const alert = ref(false)

const loginWrapper = ref(null)

// 登录方法
const login = (username, pwd) => {
  // 调用userstore的login方法，因为是promise方法所以使用then去处理后续逻辑
  userStore.login(username, pwd).then(() => {
    // 状态码为200表示登录成功
    if (userStore.userData.status === 200) {
      // 登录成功
      // 判断是否记住密码
      if (rememberPwd.value) {
        // 记住密码
        localStorage.setItem('username', username)
        localStorage.setItem('pwd', pwd)
      } else {
        // 不记住密码
        localStorage.removeItem('username')
        localStorage.removeItem('pwd')
      }
      // 跳转到首页
      loginWrapper.value.style.display = 'none'
      window.topBar.max()
      router.push('/home/screen')
    } else {
      // 登录失败
      // 提示错误信息
      alert.value = true
    }
  })
}

// 页面加载时判断是否记住密码
onMounted(() => {
  // 判断是否记住密码
  if (localStorage.getItem('username') && localStorage.getItem('pwd')) {
    // 记住密码
    rememberPwd.value = true
    // 设置用户名和密码
    username.value = localStorage.getItem('username')
    pwd.value = localStorage.getItem('pwd')
  }
})
</script>
<style scoped lang="less">
.login-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .drag {
    width: 100%;
    height: 10%;
    position: absolute;
    z-index: 1;
    -webkit-app-region: drag;
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    color: var(--label-font-color);
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
  .minimize {
    position: absolute;
    right: 40px;
    top: 0;
    color: var(--label-font-color);
    z-index: 2;
    -webkit-app-region: no-drag;
    cursor: pointer;

  }
  .card-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 10px 40px rgba(255, 184, 158, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .label-wrapper {
      width: 100%;
      height: 10%;
      text-align: center;
      margin-top: 8%;
      p {
        margin: 0;
      }
      .label {
        font-size: 1.8em;
        font-weight: 600;
        color: var(--label-font-color);
      }
      .eng {
        font-size: 1em;
        margin-top: 3%;
        color: var(--label-font-color);
      }
    }

    .input-wrapper {
      width: 100%;
      height: 28%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .userInput {
        width: 75%;
        height: 40%;
        margin-bottom: 2%;
      }
      .pwdInput {
        width: 75%;
        height: 40%;
      }
      .remember-pwd {
        width: 75%;
        font-size: 1em;
        display: flex;
        justify-content: flex-end;
      }
    }

    .login-btn {
      width: 60%;
      height: 9%;
      font-size: 1.2em;
    }
  }
}
</style>
