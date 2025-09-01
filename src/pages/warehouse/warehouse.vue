<script setup lang="ts">
//定义store
import { useUserStore } from '@/stores'

const userStore = useUserStore()

// 处理加入我们
const join = () => {
  // 没有登录提示登录
  if (!userStore.profile._id) {
    uni.showToast({ icon: 'none', title: '请先登录' })
    setTimeout(() => {
      uni.navigateTo({
        url: '/pages/login/login',
      })
    }, 800)
  } else {
    // 跳转
    uni.navigateTo({
      url: '/pages/hireForm/hireForm',
    })
  }
}
</script>
<template>
  <view class="wareHouse">
    <!--  用户端  -->
    <view class="users" v-if="userStore.profile.role !== 'manager'">
      <!-- 提示图标 -->
      <image
        class="tipsPic"
        src="https://objectstorageapi.gzg.sealos.run/dxepxlzz-sealaf-h91gpva7y7-cloud-bin/test-product/nomanage.png"
        mode="aspectFit"
      ></image>
      <!-- 文本 -->
      <view class="text">你还不是我们的员工哟~</view>
      <view class="join" @click="join">我要应聘</view>
      <!-- 按钮 -->
    </view>
  </view>
</template>

<style scoped lang="scss">
.wareHouse {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /*用户端*/
  .users {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40rpx;
    color: $jel-font-title;
    font-size: 28rpx;

    .tipsPic {
      width: 148rpx;
      height: 176rpx;
    }

    .join {
      text-align: center;
      line-height: 76rpx;
      width: 240rpx;
      height: 76rpx;
      font-size: 24rpx;
      color: #ffffff;
      background-color: $jel-brandColor;
      border-radius: 40rpx;
    }
  }
}
</style>
