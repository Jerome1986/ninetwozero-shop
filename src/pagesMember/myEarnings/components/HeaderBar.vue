<script setup lang="ts">
import { useUserStore } from '@/stores'
import { formatRole } from '@/utils/formatTimestamp.ts'
import { maskMiddle } from '@/utils/maskMiddle.ts'

//定义store
const userStore = useUserStore()
</script>

<template>
  <view class="head">
    <!--  头像  -->
    <view class="userAvatar">
      <image :src="userStore.profile.avatarUrl" mode="aspectFit"></image>
    </view>
    <!--  信息  -->
    <view class="info">
      <view class="left">
        <view class="mobile">{{ maskMiddle(userStore.profile.mobile) }}</view>
        <view class="role"
          >{{ formatRole(userStore.profile.role, userStore.profile.vipLevel) }}
        </view>
      </view>
      <view class="right">
        <view class="tixian" v-if="true">提现</view>
        <view class="total">合计：￥145.34</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.head {
  padding: 24rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  height: 156rpx;
  background: #fff;
  border-radius: 8rpx;

  .userAvatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
  }

  .info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    color: $jel-font-title;

    .left {
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8rpx;

      .tixian {
        padding: 4rpx 8rpx;
        width: fit-content;
        height: fit-content;
        font-size: 24rpx;
        color: #ffffff;
        background-color: $jel-brandColor;
        border-radius: 8rpx;
      }

      .total {
      }
    }
  }
}
</style>
