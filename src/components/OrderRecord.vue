<script setup lang="ts">
import NavTitle from '@/components/NavTitle.vue'
</script>

<template>
  <view class="orderRecord">
    <!-- title -->
    <NavTitle title="库存订单"></NavTitle>
    <!--  订单列表  -->
    <view class="list">
      <view class="item" v-for="item in 4" :key="item">
        <view class="left">
          <view class="title">库存申请</view>
          <view class="orderTime">下单时间:2025-08-07 18:17</view>
        </view>
        <!--  订单状态（备货中  待取货  已完成）  -->
        <view class="state stateA">备货中</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.orderRecord {
  padding: 24rpx;
  margin-top: 24rpx;
  background-color: #ffffff;

  .list {
    .item {
      padding: 16rpx 0;
      margin-bottom: 16rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid $jel-border;

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      .left {
        .title {
          margin-bottom: 8rpx;
          font-size: 28rpx;
          color: $jel-font-title;
        }

        .orderTime {
          font-size: 24rpx;
          color: $jel-font-dec;
        }
      }

      /*审核状态*/
      .state {
        font-size: 24rpx;
      }

      /*备货中*/
      .stateA {
        color: #ff6b19;
      }

      /*待取货*/
      .stateB {
        color: #d62731;
      }

      /*已完成*/
      .stateC {
        color: #27b20b;
      }
    }
  }
}
</style>
