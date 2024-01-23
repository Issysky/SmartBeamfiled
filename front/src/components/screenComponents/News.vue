<!-- 大屏时事新闻组件 -->
<template>
  <div class="news-wrapper">
    <Line :width="'60%'" :label="'时事新闻'"></Line>
    <ul class="news">
      <li
        ref="li"
        v-for="(item, index) in newsData.data"
        :key="index"
        @click="goToWebsite(item.link)"
      >
        <div class="label">
          <p class="title">{{ item.title }}</p>
          <p class="time">{{ item.time }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import Line from '../Line.vue'
import { useScreenStore } from '../../stores/screen.js'

const screenStore = useScreenStore()
// 定义新闻数据从接口获取
const newsData = reactive({
  data: []
})

// 点击跳转到新的网站
const goToWebsite = (url) => {
  window.open('https://' + url, '_blank')
}

const li = ref(null)
const scrollNews = () => {
  setInterval(() => {
    li.value.forEach((item, index) => {
      item.style.transform = `translateY(-${index * 30}px)`
    })
    // newsData.data.push(newsData.data.shift())
  }, 2000)
}
onMounted(async () => {
  // scrollNews()
  newsData.data = await screenStore.getNewsData()
})
</script>
<style scoped lang="less">
.news-wrapper {
  width: 22%;
  height: 34%;
  position: absolute;
  top: 59%;
  right: 2%;
  padding-left: 2%;
  padding-top: 1%;
  background-color: #cdd0d6;
  border-radius: 15px;
  box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  .news {
    width: 90%;
    height: 82%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    overflow: hidden;
    margin: 0;
    padding: 0;
    li {
      width: 100%;
      margin-top: 15px;
      &:hover {
        cursor: pointer;
      }
      p {
        margin: 0;
      }
      .label {
        width: 100%;
        font-size: 0.9em;
        font-weight: 600;
        color: #000;
        display: flex;
        .title {
          width: 80%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .time {
          width: 20%;
          font-size: 0.6em;
          margin-top: 5px;
          line-height: 2;
          color: #333;
        }
      }
      .text{
        
      }
    }
  }
}
</style>
