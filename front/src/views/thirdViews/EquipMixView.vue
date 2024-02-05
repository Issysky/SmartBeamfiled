<!-- 拌合站数据三级路由,从属二级路由设备管理 -->
<template>
    <div class="equip-mix-wrapper">
        <LabelType1 label="拌合站数据" />
        <TableType1 />
    </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import TableType1 from '@/components/TableType1.vue';
import LabelType1 from '@/components/LabelType1.vue';

</script>
<style scoped lang="less">
.equip-mix-wrapper{
    width: 100%;
    height: 100%;
}
</style>