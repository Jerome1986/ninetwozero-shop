<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { wxStorePayApi } from '@/api/wx.ts'

// 安全距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 默认参数
const amount = ref<string>('')
const storeId = ref<string>('')
const code = ref<string>('')

// 实时显示本次支付金额
const displayAmount = computed(() => amount.value || '0.00')

// 点击支付
const handlePay = async () => {
  if (!amount.value) {
    await uni.showToast({ title: '请输入金额', icon: 'none' })
    return
  }
  // 1.向后端发起支付请求
  const payRes = await wxStorePayApi(code.value, storeId.value, amount.value, '贴膜')
  console.log('payRes:', payRes)
  // 2.通过后端返回参数、发起前端微信支付
  wx.requestPayment({
    timeStamp: payRes.data.timeStamp,
    nonceStr: payRes.data.nonceStr,
    package: payRes.data.packageValue,
    signType: payRes.data.signType,
    paySign: payRes.data.paySign,
    async success(res) {
      // 3.支付成功后-跳转页面
      console.log('支付成功', res)
      await uni.showToast({ icon: 'success', title: '支付成功' })
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/my/my',
        })
      }, 800)
    },
    fail(err) {
      console.error('支付失败', err)
      uni.showToast({
        icon: 'none',
        title: '取消支付',
      })
    },
  })
}

// 通过二维码传过来的门店id和用户id
onLoad((options: any) => {
  storeId.value = options.storeId || ''
  // 获取用户code
  uni.login({
    success: async (res) => {
      console.log(res)
      code.value = res.code
    },
  })
})
</script>

<template>
  <view class="pay-container">
    <!-- 店铺信息 -->
    <view class="store-info">
      <image class="store-logo" src="/static/images/logo.png" mode="aspectFill"></image>
      <view class="store-meta">
        <view class="store-name">九贰零贴膜</view>
        <view class="store-id">街道口店</view>
      </view>
    </view>

    <!-- 金额输入 -->
    <view class="amount-box">
      <text class="currency">¥</text>
      <input
        class="amount-input"
        type="digit"
        v-model="amount"
        placeholder="请输入收款金额"
        placeholder-class="placeholder"
        confirm-type="done"
      />
    </view>

    <!-- 本次支付金额提示 -->
    <view class="payment-tip">
      本次支付金额：
      <text class="amount-highlight">¥{{ displayAmount }}</text>
    </view>

    <!-- 支付按钮 -->
    <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      <button class="btn" @click="handlePay">支付</button>
    </view>

    <!-- 底部安全说明 -->
    <view class="safety-tip"> 🔒 支付安全由微信提供保障，请确认金额后支付</view>
  </view>
</template>

<style lang="scss">
.pay-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  height: 100vh;
  padding: 40rpx;
  box-sizing: border-box;
}

/* 门店信息 */
.store-info {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx 30rpx;
  width: 100%;
  margin-bottom: 60rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.06);

  .store-logo {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    margin-right: 20rpx;
  }

  .store-meta {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .store-name {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 6rpx;
    }

    .store-id {
      font-size: 26rpx;
      color: #888;
    }
  }
}

/* 金额输入 */
.amount-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx 20rpx;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.06);
  margin-bottom: 40rpx;

  .currency {
    padding-top: 8rpx;
    margin-right: 16rpx;
    font-size: 60rpx;
    font-weight: 500;
    color: #d62731;
    height: 80rpx;
  }

  .amount-input {
    flex: 1;
    font-size: 48rpx;
    font-weight: bold;
    height: 80rpx;
    color: #333;
    outline: none;
    background: transparent;
  }

  .placeholder {
    font-size: 48rpx;
    color: #bbb;
  }
}

/* 本次支付金额提示 */
.payment-tip {
  width: 100%;
  text-align: right;
  font-size: 28rpx;
  color: #888;
  margin-bottom: 60rpx;

  .amount-highlight {
    font-size: 36rpx;
    color: #d62731;
    font-weight: bold;
  }
}

/* 支付按钮 */
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
    background-color: #d62731;
    color: #fff;
    border-radius: 40rpx;
    font-size: 28rpx;
  }
}

/* 底部安全提示 */
.safety-tip {
  width: 100%;
  text-align: center;
  font-size: 24rpx;
  color: #aaa;
  margin-top: 20rpx;
}
</style>
