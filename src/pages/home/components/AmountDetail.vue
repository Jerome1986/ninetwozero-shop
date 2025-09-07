<script setup lang="ts">
import NavTitle from '@/components/NavTitle.vue'
import type { StoreOrderFlow } from '@/types/Flow'
import { formatTimestamp } from '@/utils/formatTimestamp.ts'

defineProps<{
  flowList: StoreOrderFlow[]
}>()
</script>

<template>
  <view class="AmountDetailPages">
    <!-- title -->
    <NavTitle title="流水"></NavTitle>
    <!-- 每一项-只渲染5项  -->
    <view class="item" v-for="item in flowList" :key="item._id">
      <!--  todo 如果可以获取用户信息增加用户头像/昵称    -->
      <view class="left">
        <view class="dec">{{ item.description }}</view>
        <view class="time">{{ formatTimestamp(item.createdAt, 2) }}</view>
      </view>
      <view class="price">+￥{{ item.amount }}</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.AmountDetailPages {
  padding: 24rpx;
  margin-top: 24rpx;
  background-color: #ffffff;
  border-radius: 16rpx;

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
      .dec {
        margin-bottom: 8rpx;
        color: $jel-font-title;
      }

      .time {
        color: $jel-font-dec;
      }
    }

    .price {
      color: $jel-brandColor;
    }
  }
}
</style>
