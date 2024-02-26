<!-- 拌合站数据三级路由,从属二级路由设备管理 -->
<template>
  <div class="equip-mix-wrapper">
    <LabelType1 label="拌合站数据" eng="MixStation" />
    <TableType1 />
    <!-- 图表的详情弹窗 -->
    <CardType3 v-if="equipMixStore.detailDialogVisible" :detailData="equipMixStore.mixDetailData.data"/>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import TableType1 from '@/components/equipComponents/TableType1.vue'
import LabelType1 from '@/components/LabelType1.vue'
import CardType3 from '@/components/CardType3.vue'
import { useEquipMixStore } from '@/stores/equipMix'

const equipMixStore = useEquipMixStore()
</script>
<style scoped lang="less">
.equip-mix-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
