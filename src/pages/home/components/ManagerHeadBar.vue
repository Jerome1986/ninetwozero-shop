<script setup lang="ts">
import { useUserStore, useManagerStore } from '@/stores'
import { maskMiddle } from '@/utils/maskMiddle.ts'
import { formatRole } from '@/utils/formatTimestamp.ts'
import { ref } from 'vue'
// 定义store
const userStore = useUserStore()
const managerStore = useManagerStore()

const emits = defineEmits(['qrCode', 'saveCode'])
// 点击获取收款码
const handleQrCode = () => {
  emits('qrCode')
}

// 点击放大保存收款码
const handleSave = () => {
  emits('saveCode')
}
</script>

<template>
  <view class="header">
    <view class="info">
      <view class="avatar">
        <image :src="userStore.profile.avatarUrl"></image>
      </view>
      <view class="userText">
        <view class="mobile">{{ maskMiddle(userStore.profile.mobile) }}</view>
        <view class="role"
          >{{ formatRole(userStore.profile.role, userStore.profile.vipLevel) }}
        </view>
      </view>
    </view>
    <!--  第一次成为店长时，如果没有收款码--点击获取   -->
    <view class="right" v-if="!managerStore.managerInfo?.qrCodeUrl" @click="handleQrCode">
      <view class="qrCode">
        <image src="/static/images/code.png" mode="aspectFit"></image>
      </view>
      <view class="text">点击获取</view>
    </view>
    <!--  已设置收款码  -->
    <view class="right" v-else @click="handleSave">
      <view class="qrCode">
        <image :src="managerStore.managerInfo?.qrCodeUrl" mode="aspectFit"></image>
      </view>
      <view class="text">点击收款</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
/*用户信息*/
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24rpx;
  height: 264rpx;
  background: url('../../../static/images/backgroudImg.png') no-repeat center;
  background-size: cover;

  /*信息区域*/
  .info {
    display: flex;
    align-items: center;
    gap: 16rpx;
    color: #fff;

    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      overflow: hidden;
      background-color: #ffffff;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .userText {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 120rpx;

      .mobile {
        font-size: 36rpx;
      }

      .role {
        font-size: 28rpx;
      }
    }
  }

  .right {
    text-align: center;

    .text {
      font-size: 24rpx;
      color: #ffffff;
    }

    /*收款码*/
    .qrCode {
      width: 100rpx;
      height: 100rpx;
    }
  }
}
</style>
