<script setup lang="ts">
import type { flowTotal } from '@/types/Global'

defineProps<{
  flowTotalList: flowTotal[]
}>()
</script>

<template>
  <view class="AmountBar">
    <view class="AmountItem" v-for="(item, index) in flowTotalList" :key="index">
      <view class="navItem-link"> ￥{{ item.amount.toFixed(2) }}</view>
      <view class="name">{{ item.text }}</view>
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
