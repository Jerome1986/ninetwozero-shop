<script setup lang="ts">
import { wxLoginApi } from '@/api/login.ts'
import { useUserStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const userStore = useUserStore()

type GetPhoneNumberEvent = {
  detail: {
    code?: string // 用于获取手机号的凭证
    errMsg?: string // 错误信息
    iv?: string // 加密算法的初始向量（已废弃）
    encryptedData?: string // 加密数据（已废弃）
  }
}

// 手机登录
const handleLogin = (e: GetPhoneNumberEvent) => {
  console.log('handleMobileLogin', e)

  const params = {
    code: '',
    encryptedData: e.detail.encryptedData,
    iv: e.detail.iv,
  }

  uni.login({
    // 获取code成功
    success: async (res) => {
      console.log('登录', res)
      if (!res.code) {
        await uni.showToast({
          icon: 'none',
          title: '获取code失败',
        })
        console.error('uni.login 获取code失败', res)
        return
      }

      params.code = res.code

      try {
        const wxRes = await wxLoginApi(
          params.code,
          params.encryptedData!,
          params.iv!,
          inviterCode.value,
        )
        console.log('wxMobileLoginApi 返回', wxRes)
        // 去掉openid
        const { openid, ...newData } = wxRes.data
        if (wxRes.code === 200 && wxRes.data) {
          userStore.setProfile(newData)

          await uni.showToast({
            icon: 'success',
            title: '登录成功',
          })

          setTimeout(() => {
            uni.switchTab({
              url: '/pages/home/home',
            })
          }, 800)
        } else {
          await uni.showToast({
            icon: 'none',
            title: wxRes.message || '登录失败，请稍后重试',
          })
          console.warn('登录接口响应失败', wxRes)
        }
      } catch (err) {
        await uni.showToast({
          icon: 'none',
          title: '请求异常，请检查网络',
        })
        console.error('调用登录接口异常', err)
      }
    },
    // 获取code失败
    fail: (err) => {
      uni.showToast({
        icon: 'none',
        title: '微信登录失败',
      })
      console.error('login 失败', err)
    },
  })
}

// 获取参数-邀请码
const inviterCode = ref('')
onLoad((options) => {
  console.log(options?.inviterCode)
  if (options) {
    inviterCode.value = options.inviterCode
  }
})
</script>

<template>
  <view class="login">
    <!-- logo -->
    <view class="logo">
      <image src="/static/images/logo.png" mode="aspectFit"></image>
    </view>

    <!-- 登录区域 -->
    <view class="login-area">
      <!-- 用户协议 -->
      <view class="agreement">
        <checkbox :checked="true"></checkbox>
        <text class="text">我已阅读并同意</text>
        <text class="link">《用户协议》</text>
        <text class="text">及</text>
        <text class="link">《隐私政策》</text>
      </view>

      <!-- 登录按钮 -->
      <view class="login-btn">
        <button class="btn" type="primary" open-type="getPhoneNumber" @getphonenumber="handleLogin">
          手机号快捷登录
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.login {
  min-height: 100vh;
  background: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);
  padding: 120rpx 32rpx 0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  /* 左侧半圆 */
  &::before {
    content: '';
    position: absolute;
    left: -150rpx;
    top: 350rpx;
    width: 300rpx;
    height: 300rpx;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(255, 235, 236, 0.8) 0%,
      rgba(255, 235, 236, 0.6) 30%,
      rgba(255, 235, 236, 0.3) 60%,
      rgba(255, 235, 236, 0) 100%
    );
    z-index: 1;
  }

  /* 右侧半圆 */
  &::after {
    content: '';
    position: absolute;
    right: -150rpx;
    top: 120rpx;
    width: 300rpx;
    height: 300rpx;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(255, 235, 236, 0.8) 0%,
      rgba(255, 235, 236, 0.6) 30%,
      rgba(255, 235, 236, 0.3) 60%,
      rgba(255, 235, 236, 0) 100%
    );
    z-index: 1;
  }

  /* logo */
  .logo {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    margin-top: 80rpx;

    image {
      width: 274rpx;
      height: 274rpx;
    }
  }

  /* 登录区域 */
  .login-area {
    position: relative;
    z-index: 2;
    margin-top: auto;
    padding-bottom: 220rpx; // 调整为220rpx

    /* 用户协议 */
    .agreement {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32rpx;
      font-size: 24rpx;

      checkbox {
        transform: scale(0.7);
        margin-right: 4rpx;
      }

      .text {
        color: #999;
      }

      .link {
        color: $jel-brandColor;
      }
    }

    /* 登录按钮 */
    .login-btn {
      .btn {
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        background-color: $jel-brandColor;
        border-radius: 44rpx;
        font-size: 32rpx;
        color: #fff;
      }
    }
  }
}
</style>
