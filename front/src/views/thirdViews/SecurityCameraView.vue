<!-- 三级路由风险事件抓拍,属于二级路由安全事件 -->
<template>
  <div class="security-camera-wrapper">
    <LabelType1 label="风险事件抓拍" eng="RiskEvents" />
    <TableType2 />
    <CardType4 v-if="securityStore.securityDetailData.data !== ''" />
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import TableType2 from '@/components/securityComponents/TableType2.vue'
import LabelType1 from '@/components/LabelType1.vue'
import { useSecurityStore } from '@/stores/security'
import CardType4 from '@/components/securityComponents/CardType4.vue'
// 引入store
const securityStore = useSecurityStore()

onMounted(() => {})
</script>
<style scoped lang="less">
.security-camera-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
