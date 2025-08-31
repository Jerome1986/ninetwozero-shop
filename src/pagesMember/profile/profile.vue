<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores'
import { userInfoGetApi, userInfoUpdateApi } from '@/api/users.ts'

// 定义store
const userStore = useUserStore()

// 构建基础数据
const userData = ref({
  nickname: '',
  mobile: userStore.profile.mobile || '',
  gender: 1,
  avatarUrl: userStore.profile.avatarUrl || '',
})

// 根据当前用户id请求用户信息
const getUserInfo = async (userId: string) => {
  const res = await userInfoGetApi(userId)
  userData.value = res.data
  console.log('用户信息', res)
}
onLoad(() => getUserInfo(userStore.profile._id))

// 选择性别
const onGender = (e: any) => {
  console.log(e.detail.value)
  userData.value.gender = e.detail.value
}

// 选择并上传头像
const chooseAvatar = (e: any) => {
  console.log(e)
  let url = e.detail.avatarUrl
  userData.value.avatarUrl = e.detail.avatarUrl
  const originalname = url
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')

  // 上传到后端
  uni.uploadFile({
    url: 'https://h91gpva7y7.gzg.sealos.run/upload/images', // 你后端的上传接口
    filePath: e.detail.avatarUrl,
    name: originalname,
    success: (res) => {
      console.log('上传成功', res)
      // 可以记录后端返回的地址（永久地址）
      userData.value.avatarUrl = res.data
      userStore.setProfile({ avatarUrl: res.data })
    },
    fail: (err) => {
      console.error('上传失败', err)
    },
  })
}

// 点击保存
const onsubmit = async () => {
  console.log('onsubmit', userData.value)
  const res = await userInfoUpdateApi(
    userStore.profile._id,
    userData.value.mobile,
    userData.value.avatarUrl,
    userData.value.gender,
    userData.value.nickname,
  )
  if (res.code === 200) {
    userStore.setProfile(userData.value)
    await uni.showToast({
      icon: 'success',
      title: '更新成功',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 800)
  }
}
</script>

<template>
  <view class="viewport">
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content">
        <image class="image" :src="userData.avatarUrl" mode="aspectFill" />
        <button class="text" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
          点击修改头像
        </button>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="userData.nickname" />
        </view>
        <view class="form-item">
          <text class="label">电话</text>
          <input class="input" type="text" placeholder="请填写手机号" v-model="userData.mobile" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGender">
            <label class="radio">
              <radio value="1" color="#d62731" :checked="userData.gender === 1" />
              男
            </label>
            <label class="radio">
              <radio value="2" color="#d62731" :checked="userData.gender === 2" />
              女
            </label>
          </radio-group>
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onsubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
.viewport {
  display: flex;
  flex-direction: column;
  background-image: url('https://objectstorageapi.gzg.sealos.run/dxepxlzz-sealaf-h91gpva7y7-cloud-bin/test-product/profileBack.png');
  background-size: 100% 420rpx; /* 背景图高度和头像区域一样 */
  background-repeat: no-repeat;
  background-position: top center; /* 固定在顶部居中 */
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 420rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
    border: none;
    background-color: transparent;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: $jel-font-title;
    }

    .account {
      color: $jel-font-dec2;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: $jel-brandColor;
  }
}
</style>
