<!-- 三极路由 监控页面 从属于二级路由设备数据 -->
<template>
  <div class="main">
    <Monitor v-if="monitorStore.isShow" />
  </div>
</template>

<script setup lang="js">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import Monitor from '@/components/Monitor.vue'
import { useMonitorStore } from '@/stores/monitor';
const monitorStore = useMonitorStore()


onMounted(() => {
  monitorStore.showMonitor()
})
</script>
<style scoped lang="less"></style>
