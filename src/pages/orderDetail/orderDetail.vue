<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { OrderData } from '@/types/ManagerOrder'
import { orderDetailGetApi } from '@/api/order.ts'
import { formatTimestamp } from '@/utils/formatTimestamp.ts'

// 获取订单详情
const orderData = ref<OrderData>()
const orderDataGet = async (orderId: string) => {
  const res = await orderDetailGetApi(orderId)
  orderData.value = res.data
  console.log('详情', res)
}

onLoad((options) => {
  console.log(options)
  if (options) {
    orderDataGet(options.orderId)
  }
})
</script>

<template>
  <scroll-view class="orderDetail" :scroll-y="true" :enhanced="true" :show-scrollbar="false">
    <view class="header">
      <view class="time">
        <text style="color: #333333">下单时间：</text>
        <text style="font-size: 24rpx">{{ formatTimestamp(orderData?.creatAt, 2) }}</text>
      </view>
      <view class="state stateA" v-if="orderData?.state === '备货中'">{{ orderData?.state }}</view>
      <view class="state stateB" v-if="orderData?.state === '待取货'">{{ orderData?.state }}</view>
      <view class="state stateC" v-if="orderData?.state === '已完成'">{{ orderData?.state }}</view>
      <view class="state stateD" v-if="orderData?.state === '已取消'">{{ orderData?.state }}</view>
    </view>
    <view class="brand" v-for="cart in orderData?.product" :key="cart.brand">
      <!--  品牌头部   -->
      <view class="brand-title">
        <text class="iconfont icon-shouji"></text>
        <text class="name">{{ cart.brand }}</text>
      </view>
      <!--  品牌型号   -->
      <view class="model" v-for="m in cart.models" :key="m.model">
        <!-- 头部 -->
        <view class="head">
          <view class="text">机型：</view>
          <view class="phoneType">{{ m.model }}</view>
        </view>
        <!--  商品  -->
        <view class="proItem" v-for="p in m.items" :key="p.id">
          <!--  封面图  -->
          <view class="cover">
            <image :src="p.imageUrl"></image>
          </view>

          <!-- 商品信息 -->
          <view class="info">
            <view class="proLeft">
              <view class="name">{{ p.name }}</view>
              <view class="dec">{{ p.description }}</view>
            </view>
            <view class="proRight">
              <view class="price">￥{{ p.unitPrice }}</view>
              <view class="num">x{{ p.quantity }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 合计金额  -->
    <view class="totalOrder">
      <text style="color: #333333">合计金额</text>
      <text style="color: #d62731">￥{{ orderData?.total }}</text>
    </view>
    <!--  订单人信息  -->
    <view class="orderInfo">
      <view class="title">提货人信息</view>
      <view class="item">
        <view class="label">申请人</view>
        <view class="value">{{ orderData?.applicant.name }}</view>
      </view>
      <view class="item">
        <view class="label">申请门店</view>
        <view class="value">{{ orderData?.applicant.shop }}</view>
      </view>

      <view class="item">
        <view class="label">联系方式</view>
        <view class="value">{{ orderData?.applicant.mobile }}</view>
      </view>
    </view>

    <!-- 底部占位 -->
    <view class="toolbar-height"></view>
  </scroll-view>
</template>

<style scoped lang="scss">
.orderDetail {
  padding: 24rpx;
  height: 100%;

  /*头部*/
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 24rpx;
    background-color: #ffffff;
    border-radius: 8rpx 8rpx 0 0;
    font-size: 28rpx;

    .time {
      color: $jel-font-dec2;
    }

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

  /*品牌内容*/
  .brand {
    margin-bottom: 24rpx;
    padding: 24rpx;
    background-color: #ffffff;
    border-radius: 8rpx;
    /* 品牌标题 */
    .brand-title {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;

      .icon-shouji {
        margin-right: 8rpx;
        color: $jel-brandColor;
        font-size: 32rpx;
      }

      .name {
        font-size: 28rpx;
        font-weight: bold;
        color: $jel-font-title;
      }
    }

    /*机型*/
    .model {
      margin-bottom: 16rpx;
      /*型号头部信息*/
      .head {
        display: flex;
        align-items: center;
        margin-bottom: 24rpx;

        .text {
          color: $jel-font-title;
          font-size: 28rpx;
        }

        .phoneType {
          font-size: 24rpx;
          color: $jel-brandColor;
        }
      }

      /*商品*/
      .proItem {
        margin-bottom: 24rpx;
        display: flex;
        gap: 16rpx;

        .cover {
          height: 120rpx;
          width: 120rpx;
          border-radius: 8rpx;
          overflow: hidden;
        }

        .info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex: 1;

          .proLeft {
            .name {
              margin-bottom: 24rpx;
              font-size: 28rpx;
              color: $jel-font-title;
              @include ellipsis(1);
            }

            .dec {
              font-size: 24rpx;
              color: $jel-font-dec;
              @include ellipsis(1);
            }
          }

          .proRight {
            text-align: end;

            .price {
              font-size: 28rpx;
              color: $jel-brandColor;
            }

            .num {
              font-size: 24rpx;
              color: $jel-font-dec;
            }
          }
        }
      }
    }
  }

  /*合计金额*/
  .totalOrder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;
    padding: 16rpx;
    background-color: #fff;
    border-radius: 8rpx;
  }

  /*订单信息区域*/
  .orderInfo {
    padding: 24rpx;
    background-color: #fff;
    border-radius: 8rpx;

    .title {
      margin-bottom: 16rpx;
      color: $jel-font-title;
    }

    .item {
      padding: 16rpx 0;
      margin-bottom: 16rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      .label {
        color: $jel-font-title;
      }

      .value {
        color: $jel-font-dec;
      }
    }
  }

  /* 底部工具栏 */
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: #fff;
    height: 100rpx;
    padding: 0 20rpx var(--window-bottom);
    border-top: 1rpx solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: content-box;

    .btn {
      width: 100%;
      background-color: $jel-brandColor;
      color: #fff;
      border-radius: 40rpx;
      font-size: 28rpx;
    }
  }

  // 底部占位空盒子
  .toolbar-height {
    height: 180rpx;
  }
}
</style>
