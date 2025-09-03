<script setup lang="ts">
import { ref } from 'vue'

const amountList = ref([
  { id: '1', amount: 300, time: '昨日' },
  { id: '2', amount: 400, time: '今日' },
  { id: '3', amount: 2100, time: '本周' },
])
</script>

<template>
  <view class="AmountBar">
    <view class="AmountItem" v-for="(item, index) in amountList" :key="index">
      <view class="navItem-link"> ￥{{ item.amount.toFixed(2) }}</view>
      <view class="name">{{ item.time }}</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.AmountBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 48rpx;
  margin-top: 24rpx;
  height: 190rpx;
  background-color: #ffffff;
  border-radius: 8rpx;

  .AmountItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $jel-font-title;

    .name {
      font-size: 28rpx;
    }
  }
}
</style>
