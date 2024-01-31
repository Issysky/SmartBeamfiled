<!-- AI问答页面 -->
<template>
  <div class="wrapper">
    <div class="header">{{ homeViewText.headerText }}</div>
    <!-- <div class="clear" @click="clear">
      <el-icon>
        <CloseBold />
      </el-icon>
    </div> -->
    <div class="message-wrapper" v-if="store.messageArr.length != 0">
      <div class="message-area" v-for="(message, index) in store.messageArr" :key="index">
        <p class="label">
          <img
            class="avator"
            :src="
              message.role === 'user'
                ? 'https://gateway.guangzc.com/gzc-file-service/attachments/show/9a62df904a6d04d6bd1b3c0ce2e4f10a'
                : avatorArr[1]
            "
          />
        </p>
        <p>{{ message.role === 'user' ? nameArr[0] : nameArr[1] }}</p>
        <div class="send-res">{{ message.content }}</div>
      </div>
    </div>
    <div class="tipsWrapper" v-if="store.messageArr.length == 0">
      <div
        class="tips"
        v-for="button in buttons"
        :key="button.text"
        @click="sendMessage('user', button.text)"
      >
        {{ button.text }}
      </div>
    </div>
    <div class="input-container">
      <div class="input" ref="input">
        <textarea
          v-model="inputMessage"
          onblur=" const input = document.querySelector('.input')
    input.style.border = '2px solid #ffffff88'"
          onfocus="const input = document.querySelector('.input')
    input.style.border = '2px solid #fff'"
          @keydown.enter="sendMessage('user', inputMessage)"
          placeholder="您想知道些什么..."
          cols="30"
          rows="4"
        ></textarea>
      </div>
      <el-button
        v-if="inputMessage"
        type="info"
        plain
        @click="sendMessage('user', input.value.innerText)"
        ><el-icon> <Promotion /> </el-icon
      ></el-button>
    </div>
    <!-- <div class="footer">{{ footerInfo }}</div> -->
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useAITalkStore } from '/src/stores/AItalk'
import homeViewText from '/src/assets/json/homeView.json'
import avator from '/src/assets/avator.png'
import logo from '/public/logo.png'

// 用户和回复头像的路径
const avatorArr = ref([avator, logo])

// 用户和回复的名字
const nameArr = ref([...homeViewText.nameArr])

// 定义buttons数组
const buttons = ref([
  { type: 'info', text: homeViewText.buttonArr[0] },
  { type: 'info', text: homeViewText.buttonArr[1] },
  { type: 'info', text: homeViewText.buttonArr[2] },
  { type: 'info', text: homeViewText.buttonArr[3] }
])

const footerInfo = ref('艾环梦工程科技公司')
// 获取输入的消息
let inputMessage = ref('')
const input = ref(null)
// 获取store
const store = useAITalkStore()

// 发送信息方法
const sendMessage = (role, msg) => {
  // console.log(store.messageArr)
  console.log('调用sendMessage')
  // 如果msg存在，就把msg赋值给inputMessage
  if (msg) {
    inputMessage.value = msg
  }
  // 如果inputMessage存在，就把inputMessage的值push到messages数组中
  if (inputMessage.value) {
    store.addMessage('user', inputMessage.value)
    inputMessage.value = ''
  }
  store.getTalks()
  // 将msg和inputMessage置空
  msg = ''
  inputMessage.value = ''
}

// 清屏
const clear = () => {
  store.resetMessage()
}

// 点击获取输入框焦点
const showBorder = () => {}
// 点击取消输入框边框此处需要优化
const hideBorder = () => {}
// shift+enter换行
// const handleEnterKey = (event:KeyboardEvent) => {
//   if (event.shiftKey) {
//     // 如果同时按下了 Shift 键，就插入一个换行符
//     inputMessage += '\n';
//   } else {
//     // 否则，就发送消息
//     sendMessage('user', inputMessage);
//     inputMessage = '';
//   }
// };

onMounted(() => {})
</script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  // background-color: #bfc;
  position: relative;
  color: var(--font-level-2);

  .header {
    position: absolute;
    width: 100%;
    text-align: center;
    height: 40px;
    font-size: 1.5em;
    line-height: 40px;
    font-weight: 700;
    border-bottom: 1px solid #33333333;
    // background-color: #fff;
  }

  .clear {
    position: fixed;
    width: 20px;
    height: 20px;
    font-size: 22px;
    right: 3%;
    top: 8%;
    color: #f56c6c;
    cursor: pointer;
    &:hover {
      color: #c45656;
    }
  }
  .message-wrapper {
    width: 60%;
    overflow: hidden;
    flex: 1;
    overflow-y: auto;
    margin-top: 55px;
    .message-area {
      width: 100%;
      margin-top: 50px;
      align-items: center; // 添加这一行
      font-size: 21px;

      .label {
        font-size: 16px;
        height: 20px;
        text-align: left;
        line-height: 20px;
        .avator {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: 0px;
          // display: inline-block;
          float: left;
        }

        p {
          height: 20px;
          margin: 10px 0 0 8px;
          float: left;
          font-weight: 700;
        }
      }

      .send-res {
        width: 100%;
        // 允许换行并且高度自适应
        word-wrap: break-word;
        text-align: left;
        height: auto;
        margin-bottom: 20px;
        font-size: 22px;
        margin-top: 30px;
      }
    }
  }

  .tipsWrapper {
    width: 50%;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding-top: 35%;
    justify-content: center;
    align-items: center;
    .tips {
      width: 45%;
      float: left;
      height: 60px;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
      border-radius: 15px;
      border: 1px solid #33333388;
      margin-bottom: 15px;
      margin-right: 20px;
      background-color: #33333322;
      &:hover {
        background-color: rgba(168, 172, 169, 0.5);
      }
    }
  }

  .input-container {
    height: 20%;
    width: 60%;
    display: flex;
    align-items: center;
    // background-color: #fff;
    border-radius: 10px;
    justify-content: center;

    .input {
      width: 80%;
      height: auto;
      border-radius: 15px;
      border: 1px solid #ffffff88;
      textarea {
        border: none;
        width: 95%;
        margin-left: 20px;
        margin-top: 5px;
        outline: none;
        font-size: 20px;
        /* 清除默认的大小调整功能 */
        resize: none;
        background-color: transparent;
        color:var(--font-level-2)
      }
    }

    .el-button {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 23%;
      border-radius: 20px;
      font-weight: 800;
      font-size: 30px;

      // border: 2px solid #33333388;
    }
  }

  .footer {
    position: fixed;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #33333388;
  }
}

.message-wrapper::-webkit-scrollbar {
  width: 8px;
  border-radius: 4px;
}

.message-wrapper::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 4px;
}

.message-wrapper::-webkit-scrollbar-thumb {
  background-color: #181818;
  border-radius: 4px;
}

.message-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: #000;
}
</style>
