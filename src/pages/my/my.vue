<script setup lang="ts">
import VipCard from '@/pages/my/components/VipCard.vue'
import NavGrid from '@/pages/my/components/NavGrid.vue'
import NavTitle from '@/components/NavTitle.vue'
import { useUserStore } from '@/stores'
import { formatRole } from '@/utils/formatTimestamp.ts'
import { useActivityStore } from '@/stores/modules/activity.ts'
import { onLoad } from '@dcloudio/uni-app'
import { checkedHireApi } from '@/api/hire.ts'
import { cooperateCheckApi } from '@/api/cooperate.ts'

// 定义 store
const userStore = useUserStore()
const activityStore = useActivityStore()

// 点击登录
const login = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}

// 点击个人设置
const options = () => {
  console.log('options')
  uni.navigateTo({
    url: '/pagesMember/setting/setting',
  })
}

// 处理表单跳转
const handleForm = async (fromType: string) => {
  //  员工招聘跳转验证-如果用户提交过，则拒绝跳转
  const hireRes = await checkedHireApi(userStore.profile._id)
  let hireCheck = hireRes.data
  //  合作申请验证
  const cooperateRes = await cooperateCheckApi(userStore.profile._id)
  let cooperateCheck = cooperateRes.data

  // 处理跳转
  switch (fromType) {
    case 'hire':
      if (hireCheck) return uni.showToast({ icon: 'none', title: '请勿重复提交' })
      // 跳转
      await uni.navigateTo({
        url: '/pages/hireForm/hireForm',
      })
      break
    case 'cooperate':
      if (cooperateCheck) return uni.showToast({ icon: 'none', title: '请勿重复提交' })
      await uni.navigateTo({
        url: '/pages/cooperateForm/cooperateForm',
      })
      break
  }
}

onLoad(() => activityStore.activityListGet())
</script>

<template>
  <scroll-view class="my" :scroll-y="true" :show-scrollbar="false">
    <!-- 用户信息区域 -->
    <view class="user-info">
      <!-- 信息区域 -->
      <view class="info">
        <view class="avatar">
          <image :src="userStore.profile.avatarUrl"></image>
        </view>
        <!--   未登录     -->
        <view class="userText" v-if="!userStore.profile._id" @click="login">
          <view class="mobile">点击登录</view>
        </view>
        <!--   已登录     -->
        <view class="userText" v-else>
          <view class="mobile">{{ userStore.profile.mobile }}</view>
          <view class="role"
            >{{ formatRole(userStore.profile.role, userStore.profile.vipLevel) }}
          </view>
        </view>
      </view>
      <!-- 设置按钮 -->
      <view class="options" @click="options">
        <text class="iconfont icon-shezhi" style="font-size: 28rpx"></text>
        <text style="font-size: 24rpx; margin-left: 8rpx">设置</text>
      </view>
    </view>

    <view class="content">
      <!-- 会员权益卡片 -->
      <VipCard v-if="userStore.profile.role === 'vip'"></VipCard>

      <!-- 功能导航 -->
      <NavGrid></NavGrid>

      <!--   报名申请   -->
      <view class="signUp">
        <view class="item" @click="handleForm('hire')">
          <image class="img" src="/static/images/yuanggong.png" mode="widthFix"></image>
        </view>
        <view class="item" @click="handleForm('cooperate')">
          <image class="img" src="/static/images/hezuo.png" mode="widthFix"></image>
        </view>
      </view>

      <!--   活动列表   -->
      <view class="activityList">
        <NavTitle title="热门活动" :is-more="false"></NavTitle>
        <view class="activityItem" v-for="item in activityStore.activityList" :key="item._id">
          <image class="imageUrl" :src="item.cover"></image>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss">
.my {
  display: flex;
  flex-direction: column;
  height: 100%;
  /*用户信息*/
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24rpx;
    height: 264rpx;
    background: url('../../static/images/backgroudImg.png') no-repeat center;
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

    /*设置按钮*/
    .options {
      display: flex;
      align-items: center;
      padding: 10rpx 12rpx;
      color: #ffffff;
      border: 1px solid #ff8990;
      border-radius: 4rpx;
    }
  }

  /*scroll内容区域*/
  .content {
    padding: 0 24rpx 20rpx 24rpx;
    transform: translateY(-96rpx);
    flex: 1;

    /*合作*/
    .signUp {
      margin-top: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .item {
        width: 340rpx;
        height: 164rpx;
        border-radius: 8rpx;
        background-color: #ffffff;
      }
    }

    .activityList {
      margin-top: 24rpx;

      .activityItem {
        margin-bottom: 24rpx;
        height: 304rpx;
        background-color: #ffffff;
        border-radius: 18rpx;

        .imageUrl {
          border-radius: 18rpx;
        }
      }
    }
  }
}
</style>
