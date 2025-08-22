<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { HireItem } from '@/types/HireItem'
import { validateForm } from '@/utils/validate'
import { useUserStore } from '@/stores'
import { updateImg } from '@/composables/updateImg'
import { hireAddApi } from '@/api/hire'

const { safeAreaInsets } = uni.getSystemInfoSync()

// 定义store
const userStore = useUserStore()

// 基础表单数据
const form = ref<HireItem>({
  userId: userStore.profile._id,
  name: '',
  mobile: '',
  icCardFont: '',
  icCardBack: '',
})

// 处理上传
const handleUpdate = (type: string) => {
  if (type === 'font') {
    console.log('font')
    updateImg(form.value, 'font')
  }

  if (type === 'back') {
    console.log('back')
    updateImg(form.value, 'back')
  }
}

const isSubmitting = ref(false)

// 提交
const handleSubmit = async (): Promise<void> => {
  console.log('提交', form.value)

  // 用户身份验证
  if (userStore.profile.role === 'manager') {
    uni.showToast({
      title: '您已经是我们的员工啦',
      icon: 'none',
    })
    return
  }

  // 表单验证
  if (!validateForm(form.value)) {
    return
  }

  // 防止重复提交
  if (isSubmitting.value) {
    return
  }
  isSubmitting.value = true

  try {
    uni.showLoading({
      title: '提交中...',
      mask: true,
    })

    const res = await hireAddApi(
      form.value.userId,
      form.value.name,
      form.value.mobile,
      form.value.icCardFont,
      form.value.icCardBack,
    )

    console.log('提交结果', res)

    if (res.data?.insertedId) {
      uni.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1500,
      })

      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    } else {
      throw new Error(res.message || '提交失败，请重试')
    }
  } catch (error: any) {
    console.error('提交错误:', error)
    const errorMessage = error?.message || '网络错误，请重试'

    uni.showToast({
      title: errorMessage,
      icon: 'none',
      duration: 3000,
    })
  } finally {
    isSubmitting.value = false
    uni.hideLoading()
  }
}
</script>

<template>
  <view class="hireForm">
    <view class="form">
      <!-- 信息区域 -->
      <view class="info">
        <!-- title -->
        <view class="title"> <text style="color: #d62731">*</text> 基本信息 </view>
        <!-- 表单内容 -->
        <view class="item">
          <text class="name">姓名</text>
          <input class="ipt" v-model="form.name" placeholder="请输入您的姓名" />
        </view>
        <view class="item">
          <text class="name">电话</text>
          <input class="ipt" v-model="form.mobile" placeholder="请输入您的电话" />
        </view>
      </view>
      <!-- 上传区域 -->
      <view class="update">
        <!-- title -->
        <view class="title"> <text style="color: #d62731">*</text> 上传身份证 </view>
        <!-- 证件正面 -->
        <view class="updateItem">
          <view class="left" @click="handleUpdate('font')">
            <text
              style="color: #d62731; font-size: 40rpx; margin-bottom: 12rpx"
              class="iconfont icon-tianjia"
            ></text>
            <text style="font-size: 24rpx; color: #777777">上传身份证正面</text>
          </view>
          <view class="right">
            <image
              :src="form.icCardFont ? form.icCardFont : '../../static/images/icCardBack.png'"
              mode="aspectFill"
            />
          </view>
        </view>
        <!-- 证件反面 -->
        <view class="updateItem">
          <view class="left" @click="handleUpdate('back')">
            <text
              style="color: #d62731; font-size: 40rpx; margin-bottom: 12rpx"
              class="iconfont icon-tianjia"
            ></text>
            <text style="font-size: 24rpx; color: #777777">上传身份证反面</text>
          </view>
          <view class="right">
            <image
              :src="form.icCardBack ? form.icCardBack : '../../static/images/icCardFont.png'"
              mode="aspectFill"
            />
          </view>
        </view>
      </view>
      <!-- 提交按钮 -->
      <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
        <button class="btn" @click="handleSubmit">提交</button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.hireForm {
  padding: 24rpx;
  .form {
    /*文字信息区域*/
    .info {
      padding: 24rpx;
      background-color: #ffffff;
      border-radius: 8rpx;

      /*标题*/
      .title {
        margin-bottom: 24rpx;
        color: $jel-font-title;
      }
      .item {
        margin-bottom: 24rpx;
        display: flex;
        gap: 60rpx;
        font-size: 28rpx;
        color: $jel-font-dec2;

        &:nth-last-child(1) {
          margin-bottom: 0;
        }

        .ipt {
          flex: 1;
        }
      }
    }

    /*上传区域*/
    .update {
      margin-top: 24rpx;
      padding: 24rpx;
      background-color: #ffffff;
      border-radius: 8rpx;

      /*标题*/
      .title {
        margin-bottom: 24rpx;
        color: $jel-font-title;
      }

      .updateItem {
        margin-bottom: 24rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24rpx;
        height: 262rpx;
        border: 1px solid $jel-border;
        border-radius: 4rpx;

        &:nth-last-child(1) {
          margin-bottom: 0;
        }

        .left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;
          height: 214rpx;
          border-radius: 4rpx;
        }

        .right {
          width: 320rpx;
          height: 214rpx;
        }
      }
    }
    /*底部按钮*/
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
    }
  }
}
</style>
