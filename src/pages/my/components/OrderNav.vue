<script setup lang="ts">
// 订单选项
import { useUserStore } from '@/stores'

const orderTypes = [
  { type: 1, text: '我的收益', icon: 'icon-shouyi1' },
  { type: 2, text: '我的库存', icon: 'icon-shenqing1' },
  { type: 3, text: '我的推荐', icon: 'icon-tuijian1' },
  { type: 4, text: '门店管理', icon: 'icon-guanli' },
]

// 定义 store
const userStore = useUserStore()

// 处理功能区域
const handleGrid = (val: string) => {
  // 检查用户是否登录
  if (!userStore.profile._id)
    return uni.showToast({ icon: 'none', title: '登录后可查看', mask: true })

  // 点击功能
  switch (val) {
    case '我的收益':
      console.log('我的收益')
      uni.navigateTo({
        url: '/pagesMember/myRevenue/myRevenue',
      })
      break
    case '我的库存':
      console.log('我的库存')
      uni.navigateTo({
        url: '/pages/orderList/orderList',
      })
      break
    case '我的推荐':
      console.log('我的推荐')
      uni.navigateTo({
        url: '/pagesMember/myFriends/myFriends',
      })
      break
    case '门店管理':
      console.log('门店管理')
      uni.navigateTo({
        url: '/pages/businessList/businessList',
      })
      break
  }
}
</script>

<template>
  <!-- 我的订单 -->
  <view class="orders">
    <view class="nav-grid">
      <view
        class="navItem"
        v-for="(item, index) in orderTypes"
        :key="index"
        @click="handleGrid(item.text)"
      >
        <view class="navItem-link">
          <text style="color: #d62731; font-size: 40rpx" class="iconfont" :class="item.icon"></text>
        </view>
        <view class="name">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
/* 我的订单 */
.orders {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 50rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

  .nav-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8rpx;

    .navItem {
      display: flex;
      flex-direction: column;
      align-items: center;
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
}
</style>
