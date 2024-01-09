<!-- 左侧边栏 出现在绝大多数页面中 -->
<template>
  <div class="leftBar-wrapper" ref="leftBar">
    <div class="user-wrapper">
      <img src="../assets/logo.png" alt="" />
      <p>
        中铁十七局集团
      </p>
    </div>
    <div class="nav-wrapper">
      <div class="label">设备列表</div>
      <div class="nav" v-for="(item, index) in 4">模板</div>
    </div>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.leftBar-wrapper {
  position: relative;
  width:12vw;
  height: 83vh;
  border-radius: 15px;
  background:var(--LeftNavBgColor);
  display: flex;
  flex-direction: column;
  box-shadow: 7px 7px 10px #00000033;
  transition: all 0.3s linear;
  overflow: hidden;

  .user-wrapper {
    width: 100%;
    height: 14%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
      object-fit: contain;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-right: 3%;
    }
    p {
      font-size: 0.8em;
      color: var(--LeftNavFontColor);
      margin: 0;
      line-height: 1.5;
    }
  }
  .nav-wrapper {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .label {
      width: 80%;
      height: 8%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3em;
      color: var(--LeftNavFontColor);
      font-weight: bold;
      border-bottom: 1px solid #fff;
      margin-bottom: 5%;
    }
    .nav {
      width: 80%;
      height: 5%;
      margin-bottom: 8%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1em;
      color: var(--LeftNavFontColor);
      font-weight: 600;
      letter-spacing: 2px;
      border-radius: 10px;
      cursor: pointer;
        &:hover{
            color: var(--LeftNavFontColor);
            background-color:#003F73 ;
        }
    }
  }
}
</style>
