<script setup lang="ts">
import { ref } from 'vue'

// tab选项
const order = [
  { id: '1', state: '全部' },
  { id: '2', state: '备货中' },
  { id: '3', state: '待取货' },
  { id: '4', state: '已完成' },
  { id: '5', state: '已取消' },
]

// 激活下标
const activeIndex = ref(0)

// 根据订单状态和门店id获取订单
</script>
<template>
  <view class="orderList">
    <!--  tab  -->
    <view class="tabList">
      <view
        class="tabItem"
        :class="{ tabActive: activeIndex === index }"
        v-for="(item, index) in order"
        :key="item.id"
        @click="activeIndex = index"
        >{{ item.state }}
      </view>
    </view>
    <!--  对应的订单列表  -->
    <view class="list">
      <view class="item">
        <view class="left">
          <view class="dec">进货申请</view>
          <view class="time">下单时间：2025.08.07 18:17</view>
        </view>
        <view class="state">待取货</view>
      </view>
    </view>
  </view>
</template>
<style scoped lang="scss">
.orderList {
  padding: 24rpx;
  /*tab*/
  .tabList {
    display: flex;
    border-radius: 8rpx;
    width: fit-content;
    overflow: hidden;

    .tabItem {
      padding: 8rpx 12rpx;
      width: fit-content;
      height: 50rpx;
      font-size: 24rpx;
      color: $jel-font-title;
      background-color: #e8e8e8;
    }

    .tabActive {
      color: #ffffff;
      background-color: $jel-brandColor;
    }
  }

  /*订单列表*/
  .list {
    margin-top: 24rpx;

    .item {
      padding: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background-color: #ffffff;
      border-radius: 8rpx;

      .left {
        /*下单说明*/
        .dec {
          margin-bottom: 8rpx;
          font-size: 28rpx;
          color: $jel-font-title;
        }

        /*下单时间*/
        .time {
          font-size: 24rpx;
          color: $jel-font-dec;
        }
      }

      /*状态*/
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

      /*已取消*/
      .stateD {
        color: $jel-font-dec;
      }
    }
  }
}
</style>
