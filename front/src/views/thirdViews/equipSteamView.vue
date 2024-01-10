<!-- 三级路由 蒸养棚 -->
<template>
  <div class="equip-steam-wrapper">
    <div class="card" v-for="(item,index) in 4">

    </div>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.equip-steam-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  .card {
    width: 40%;
    height: 30%;
    background-color: #FFF;
    margin-bottom: 5%;
    border-radius:10px;
  }
}
</style>
