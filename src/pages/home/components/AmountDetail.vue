<script setup lang="ts">
import NavTitle from '@/components/NavTitle.vue'
import type { StoreOrderFlow } from '@/types/Flow'
import { formatTimestamp } from '@/utils/formatTimestamp.ts'

defineProps<{
  flowList: StoreOrderFlow[]
}>()

// 跳转到当前门店流水详情
const handleFlowDetail = () => {
  console.log('流水详情')
  uni.navigateTo({
    url: '/pages/storeFlowDetail/storeFlowDetail',
  })
}
</script>

<template>
  <view class="AmountDetailPages" @click="handleFlowDetail">
    <!-- title -->
    <NavTitle title="流水"></NavTitle>
    <view class="list" v-if="flowList.length > 0">
      <!-- 每一项-只渲染5项  -->
      <view class="item" v-for="item in flowList" :key="item._id">
        <!--  todo 如果可以获取用户信息增加用户头像/昵称    -->
        <view class="left">
          <view class="dec">{{ item.description }}</view>
          <view class="time">时间：{{ formatTimestamp(item.createdAt, 2) }}</view>
        </view>
        <view class="price">+￥{{ item.amount }}</view>
      </view>
    </view>
    <!-- 流水空状态 -->
    <view class="cart-blank" v-else>
      <image src="/static/images/empty.png" class="image" />
      <text class="text">您还没开张呢~</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.AmountDetailPages {
  padding: 24rpx;
  margin-top: 24rpx;
  background-color: #ffffff;
  border-radius: 16rpx;

  .list {
    .item {
      margin-bottom: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 28rpx;
      border-bottom: 1px solid $jel-border;

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .dec {
          margin-bottom: 8rpx;
          color: $jel-font-title;
        }

        .time {
          font-size: 24rpx;
          color: $jel-font-dec;
        }
      }

      .price {
        color: $jel-brandColor;
      }
    }
  }

  // 空状态
  .cart-blank {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 30vh;

    .image {
      width: 160rpx;
      height: 200rpx;
    }

    .text {
      color: $jel-font-title;
      font-size: 26rpx;
      margin: 20rpx 0;
    }

    .button {
      width: 240rpx !important;
      height: 60rpx;
      line-height: 60rpx;
      margin-top: 20rpx;
      font-size: 26rpx;
      border-radius: 60rpx;
      color: #fff;
      background-color: $jel-brandColor;
    }
  }
}
</style>
