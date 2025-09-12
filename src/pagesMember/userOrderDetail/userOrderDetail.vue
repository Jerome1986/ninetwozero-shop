<script setup lang="ts">
// 仅结构与样式（示例数据，可替换为真实数据）
import { ref } from 'vue'
import { vipOrderDetailGetApi } from '@/api/order.ts'
import type { VipOrderItem } from '@/types/VipOrderItem.ts'
import { onLoad } from '@dcloudio/uni-app'
import { formatOrderState } from '@/utils/formatTimestamp.ts'

// 获取订单详情
const order = ref<VipOrderItem>()
const orderDetailGet = async (orderNo: string) => {
  const res = await vipOrderDetailGetApi(orderNo)
  order.value = res.data
}

onLoad((options) => {
  if (options) {
    orderDetailGet(options.orderNo)
  }
})
</script>

<template>
  <view class="order-detail">
    <!-- 顶部状态与等级 -->
    <view class="top-bar">
      <view class="left">
        <view class="vip-badge"></view>
        <view class="level">{{ order?.vipLevelText }}</view>
      </view>
      <view
        class="status"
        :class="{
          paid: order?.status === 'PAID',
          pending: order?.status === 'PENDING',
          closed: order?.status === 'CANCELLED',
          refunded: order?.status === 'REFUNDED',
        }"
      >
        {{ order?.status ? formatOrderState(order?.status) : '未知' }}
      </view>
    </view>

    <!-- 权益与价格 -->
    <view class="card">
      <view class="features">
        <view class="feature">
          <text class="label">折扣</text>
          <text class="value">{{ order?.discount }}折</text>
        </view>
        <view class="divider"></view>
        <view class="feature">
          <text class="label">赠送贴膜</text>
          <text class="value">{{ order?.giftCount }}次</text>
        </view>
        <view class="divider"></view>
        <view class="feature">
          <text class="label">有效期</text>
          <text class="value">{{ order?.term }}</text>
        </view>
      </view>

      <view class="price-row">
        <text class="symbol">￥</text>
        <text class="price">{{ order?.amount.toFixed(2) }}</text>
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="section">
      <view class="section-title">订单信息</view>
      <view class="meta">
        <view class="row">
          <text class="label">订单号</text>
          <text class="value">{{ order?.out_trade_no }}</text>
        </view>
        <view class="row">
          <text class="label">下单时间</text>
          <text class="value">{{ order?.createdAt }}</text>
        </view>
        <view class="row">
          <text class="label">支付方式</text>
          <text class="value">微信支付</text>
        </view>
        <view class="row">
          <text class="label">订单状态</text>
          <text class="value">{{ order?.status }}</text>
        </view>
        <view class="row">
          <text class="label">实付金额</text>
          <text class="value brand">￥{{ order?.amount.toFixed(2) }}</text>
        </view>
      </view>
    </view>

    <!-- 说明 -->
    <view class="tips"> 温馨提示：会员权益一经开通即刻生效；如需发票或咨询，请联系在线客服。</view>

    <view class="bottom-space"></view>
  </view>
</template>

<style scoped lang="scss">
.order-detail {
  min-height: 100vh;
  background-color: $jel-pageBackGroundColor;
  padding: 24rpx;
  box-sizing: border-box;

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
    margin-bottom: 16rpx;
    gap: 12rpx;

    .left {
      display: flex;
      align-items: center;
      gap: 12rpx;
      min-width: 0;

      .vip-badge {
        width: 28rpx;
        height: 28rpx;
        border-radius: 50%;
        background: linear-gradient(180deg, #ffd66e, #ffb800);
        box-shadow: inset 0 2rpx 4rpx rgba(0, 0, 0, 0.08);
        flex-shrink: 0;
      }

      .level {
        font-size: 28rpx;
        color: $jel-font-title;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .status {
      padding: 6rpx 14rpx;
      font-size: 22rpx;
      border-radius: 999rpx;
      border: 1rpx solid #eee;
      color: $jel-font-title;
      flex-shrink: 0;

      &.paid {
        color: #27b20b;
        background-color: #eef9ee;
        border-color: #e0f2e0;
      }

      &.pending {
        color: #ff6b19;
        background-color: #fff3e9;
        border-color: #ffe3cc;
      }

      &.closed {
        color: #999;
        background-color: #f5f5f5;
        border-color: #eee;
      }

      &.refunded {
        color: #3b82f6;
        background-color: #eaf2ff;
        border-color: #d6e7ff;
      }
    }
  }

  .card {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
    margin-bottom: 16rpx;

    .features {
      display: flex;
      align-items: center;
      background-color: #fafafa;
      border-radius: 12rpx;
      padding: 12rpx;

      .feature {
        flex: 1;
        text-align: center;

        .label {
          font-size: 22rpx;
          color: $jel-font-dec;
        }

        .value {
          margin-top: 4rpx;
          display: block;
          font-size: 26rpx;
          color: $jel-font-title;
          font-weight: 600;
        }
      }

      .divider {
        width: 1rpx;
        height: 28rpx;
        background-color: #eee;
      }
    }

    .price-row {
      margin-top: 16rpx;
      display: flex;
      align-items: baseline;
      justify-content: flex-end;
      color: $jel-brandColor;

      .symbol {
        font-size: 24rpx;
      }

      .price {
        font-size: 40rpx;
        font-weight: 700;
        margin-left: 4rpx;
      }
    }
  }

  .section {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);

    .section-title {
      font-size: 28rpx;
      color: $jel-font-title;
      font-weight: 600;
      margin-bottom: 12rpx;
    }

    .meta {
      display: grid;
      grid-template-columns: 140rpx 1fr;
      row-gap: 10rpx;
      column-gap: 12rpx;
      align-items: center;

      .row {
        display: contents;
      }

      .label {
        font-size: 22rpx;
        color: $jel-font-dec;
      }

      .value {
        font-size: 24rpx;
        color: $jel-font-title;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .brand {
        color: $jel-brandColor;
        font-weight: 700;
      }
    }
  }

  .tips {
    margin-top: 16rpx;
    font-size: 22rpx;
    color: $jel-font-dec2;
    line-height: 1.6;
  }

  .bottom-space {
    height: 120rpx;
  }
}
</style>
