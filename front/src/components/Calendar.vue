<!-- 日历组件 -->
<template>
  <div>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
// import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

const handleDateClick = (arg) => {
  // alert(arg.dateStr)
  console.log('data')
}
const handleEventClick = (arg) => {
  console.log('event')
}
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin], // 需要用哪个插件引入后放到这个数组里
  height: 600, //日历高度
  initialDate: new Date('2024-01-01'), // 日历第一次加载时显示的初始日期。可以解析为Date的任何职包括ISO8601日期字符串，例如"2014-02-01"。
  initialView: 'dayGridMonth',
  editable: true,
  locale: 'zh-cn', // 设置日历的语言，中文为 “zh-cn”
  firstDay: '1', // 设置每周的第一天，默认值取决于当前语言环境，该值为代表星期几的数字，且值必须为整数，星期日=0
  buttonText: {
    // 文本将显示在headerToolbar / footerToolbar的按钮上。不支持HTML注入。所有特殊字符将被转义。
    today: '今天',
    month: '月',
    week: '周',
    day: '天'
  },
  headerToolbar: {
    // 在日历顶部定义按钮和标题。将headerToolbar选项设置为false不会显示任何标题工具栏。可以为对象提供属性start/center/end或left/center/right。这些属性包含带有逗号/空格分隔值的字符串。用逗号分隔的值将相邻显示。用空格分隔的值之间会显示一个很小的间隙。
    right: 'today prev,next',
    center: 'title',
    left: ''
  },

  events: [
    {
      title: '已完成:185',
      start: '2024-01-15',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: '#F9AE26'
    },
    {
      title: '今日任务',
      start: '2024-01-15',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: '#F9AE26'
    },
    { title: '已完成 2', date: '2024-04-02' },
    { title: '未完成:30', date: '2024-01-15' }
  ],
  dateClick: handleDateClick,
  eventClick: handleEventClick
  // weekends: false
})

onMounted(() => {
  const fullCalendar = ref(null)
  const calendarApi = fullCalendar.value.getApi()
})
</script>

<style scoped lang="less">
div {
  width: 40vw;
  font-size: 12px;
  background-color: antiquewhite;
  height: 40vh;
  .fc-h-event .fc-event-title-container {
    height: 30px;
  }
}
.fc-day-other {
  background-color: #fff;
}
</style>
