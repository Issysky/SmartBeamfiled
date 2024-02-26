<!-- 有害气体表格  出现在设备管理,有害气体页面-->
<template>
  <div class="form-gas-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper">
        <!-- 过滤器 -->
        <div class="filter">
          <div class="time-select">
            <el-date-picker
              v-model="datePickerValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              @change="getParams('time', datePickerValue)"
            />
          </div>
          <!-- 文本框筛选 -->
          <div class="input-wrapper">
            <input
              v-model="event_type"
              type="text"
              class="strength-grade"
              placeholder="事件类型"
              @blur="getParams('event_type', event_type)"
            />
          </div>
          <div class="input-wrapper">
            <input
              v-model="name"
              type="text"
              class="strength-grade"
              placeholder="地点名称"
              @blur="getParams('name', name)"
            />
          </div>
          <div class="btn-arr">
            <button @click="getSecurityData('', '')">查询</button>
            <button @click="resetParams('', '')">重置</button>
            <button @click="securityStore.exportExcelData()">导出</button>
          </div>
        </div>
      </div>
      <!-- echarts图表 -->
      <!-- <div class="echart-wrapper">
        <div class="chart1">
          <ChartSecurity />
        </div>
      </div> -->
      <!-- 表格主体 -->
      <div class="table">
        <div class="title-wrapper">
          <div class="title" v-for="(item, index) in securityStore.securityColumns" :key="index">
            <span> {{ item.name }}</span>
          </div>
        </div>
        <div class="value-wrapper">
          <div
            class="value-column"
            v-for="(item, index) in securityStore.securityData.data"
            :key="index"
          >
            <p class="value" v-for="(valueKey, i) in securityStore.securityDataKey" :key="index">
              <!-- 缩略图和事件类型特殊处理 -->
              {{ valueKey === 'image_url' || valueKey === 'event_type' ? '' : item[valueKey] }}
              <!-- 详情显示字体图标 -->
              <el-icon
                v-if="valueKey === 'detail'"
                :style="{ cursor: 'pointer', fontSize: '1.5em' }"
                @click="securityStore.getSecurityDetailData(item)"
                ><Document
              /></el-icon>
              <!-- 缩略图 -->
              <img :src="item[valueKey]" v-if="valueKey === 'image_url'" alt="" />
              <!-- 事件类型 -->
              <span v-if="valueKey === 'event_type'">{{ getEventType(item[valueKey]) }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="currentPage"
          @change="getSecurityData('page', currentPage)"
          :total="securityStore.totalPage * 10"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less"></style>
