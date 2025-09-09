<script setup lang="ts">
//获取安全距离
import { useCartStore } from '@/stores'

const { safeAreaInsets } = uni.getSystemInfoSync()

defineProps<{
  cateType: string | number
}>()

// 定义store
const cartStore = useCartStore()

const emits = defineEmits(['addCart', 'nowAdd'])

// 加入库存
const addCart = () => {
  console.log('子组件addCart')
  emits('addCart')
}

// 立即添加
const buyNow = () => {
  console.log('buyNow')
  emits('nowAdd')
}

// 处理我想要
const handleWant = () => {
  console.log('handleWant')
  uni.showModal({
    title: '提示',
    content: '已收到你的心声',
    confirmColor: '#d62731',
  })
}
</script>

<template>
  <!-- 用户操作 -->
  <view
    class="toolbar"
    :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"
    v-if="cateType === 1 || cateType === '1'"
  >
    <view class="icons">
      <button class="icons-button" open-type="contact">
        <text style="font-size: 40rpx" class="iconfont icon-kefu"></text>
        客服
      </button>
      <navigator class="icons-button" url="/pages/warehouse/warehouse" open-type="switchTab">
        <text style="font-size: 40rpx" class="iconfont icon-a-ziyuan1"></text>
        <!-- 当前购物车数量 -->
        <text class="cratNum" v-if="cartStore.cartCount > 0">
          {{ cartStore.cartCount }}
        </text>
        仓库
      </navigator>
    </view>
    <view class="buttons">
      <view class="addcart" @tap="addCart">加入库存</view>
      <view class="buynow" @tap="buyNow">立即添加</view>
    </view>
  </view>
  <!--  如果是礼品  -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }" v-else>
    <button class="btn" @click="handleWant">我想要</button>
  </view>
</template>

<style scoped lang="scss">
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

  .buttons {
    display: flex;

    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }

    .addcart {
      background-color: #1a2251;
    }

    .buynow,
    .payment {
      background-color: $jel-brandColor;
      margin-left: 20rpx;
    }
  }

  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;

    .icons-button {
      position: relative;
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: $jel-font-title;
      background-color: #fff;

      &::after {
        border: none;
      }

      .cratNum {
        position: absolute;
        width: 30rpx;
        height: 30rpx;
        line-height: 30rpx;
        top: -10rpx;
        right: 10rpx;
        font-size: 24rpx;
        color: white;
        background-color: $jel-brandColor;
        border-radius: 50%;
      }
    }

    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
