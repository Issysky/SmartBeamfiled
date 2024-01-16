<!-- 登陆页面 打开应用后的第一个页面-->
<template>
  <div class="login-wrapper">
    <TopBarLogin></TopBarLogin>
    <!-- 背景图片 -->
    <div class="bg"></div>
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

// 定义记住密码参数
const rememberPwd = ref(false)
// 定义路由
const router = useRouter()
// 定义userstore
const userStore = useUserStore()
// 定义用户名和密码
const username = ref('')
const pwd = ref('')
// 错误提示框
const alert = ref(false)

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
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .card-wrapper {
    position: absolute;
    width: 30vw;
    height: 60vh;
    top: 20vh;
    left: 15vw;
    background-color: #f1f6fd;
    border-radius: 20px;
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
      }
      .eng {
        font-size: 1em;
        margin-top: 3%;
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
