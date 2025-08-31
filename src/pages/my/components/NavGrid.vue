<script setup lang="ts">
import { useUserStore } from '@/stores'

// 定义store
const userStore = useUserStore()

const data = [
  { icon: 'icon-shouyi1', name: '优惠券' },
  { icon: 'icon-shenqing1', name: '我的申请' },
  { icon: 'icon-tuijian1', name: '我的推荐' },
  { icon: 'icon-huiyuan', name: '会员权益' },
]

// 处理功能区域
const handleGrid = (val: string) => {
  // 检查用户是否登录
  if (!userStore.profile._id)
    return uni.showToast({ icon: 'none', title: '登录后可查看', mask: true })

  // 点击功能
  switch (val) {
    case '优惠券':
      console.log('优惠券')
      uni.navigateTo({
        url: '/pagesMember/myEarnings/myEarnings',
      })
      break
    case '我的申请':
      console.log('我的申请')
      uni.navigateTo({
        url: '/pagesMember/myApply/myApply',
      })
      break
    case '我的推荐':
      console.log('我的推荐')
      uni.navigateTo({
        url: '/pagesMember/myFriends/myFriends',
      })
      break
    case '会员权益':
      console.log('会员权益')
      uni.navigateTo({
        url: '/pagesMember/myVip/myVip',
      })
      break
  }
}
</script>

<template>
  <view class="nav-grid">
    <view class="navItem" v-for="(item, index) in data" :key="index" @click="handleGrid(item.name)">
      <view class="navItem-link">
        <text style="color: #d62731; font-size: 40rpx" class="iconfont" :class="item.icon"></text>
      </view>
      <view class="name">{{ item.name }}</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.nav-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 48rpx;
  margin-top: 24rpx;
  height: 190rpx;
  background-color: #ffffff;
  border-radius: 8rpx;

  .navItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12rpx;

    .navItem-link {
      width: 80rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 50%;
      background-color: #fceeef;
    }

    .name {
      font-size: 24rpx;
      color: $jel-font-title;
    }
  }
}
</style>
