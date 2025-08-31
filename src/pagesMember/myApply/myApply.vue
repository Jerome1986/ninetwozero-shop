<script setup lang="ts">
import { checkedHireApi } from '@/api/hire.ts'
import { cooperateCheckApi } from '@/api/cooperate.ts'
import { useUserStore } from '@/stores'

// 定义store
const userStore = useUserStore()

const handleApply = async (fromType: string) => {
  //  员工招聘跳转验证-如果用户提交过，则拒绝跳转
  const hireRes = await checkedHireApi(userStore.profile._id)
  let hireCheck = hireRes.data
  //  合作申请验证
  const cooperateRes = await cooperateCheckApi(userStore.profile._id)
  let cooperateCheck = cooperateRes.data

  // 处理跳转
  switch (fromType) {
    case 'hire':
      if (!hireCheck) return uni.showToast({ icon: 'none', title: '还没有提交申请' })
      // 跳转
      await uni.navigateTo({ url: `/pagesMember/applyStatus/applyStatus?applyType=${fromType}` })
      break
    case 'cooperate':
      if (!cooperateCheck) return uni.showToast({ icon: 'none', title: '还没有提交申请' })
      await uni.navigateTo({ url: `/pagesMember/applyStatus/applyStatus?applyType=${fromType}` })
      break
  }
}
</script>
<template>
  <view class="myApply">
    <!-- 应聘申请  -->
    <view class="item" @click="handleApply('hire')">
      <view class="left">
        <view class="title">应聘申请</view>
        <view class="lookBtn">去查看</view>
      </view>
      <view class="backIcon">
        <image
          src="https://objectstorageapi.gzg.sealos.run/dxepxlzz-sealaf-h91gpva7y7-cloud-bin/test-product/yingpinicon.png"
          mode="aspectFit"
        ></image>
      </view>
    </view>
    <!-- 合作咨询  -->
    <view class="item" @click="handleApply('cooperate')">
      <view class="left">
        <view class="title">合作咨询</view>
        <view class="lookBtn">去查看</view>
      </view>
      <view class="backIcon">
        <image
          src="https://objectstorageapi.gzg.sealos.run/dxepxlzz-sealaf-h91gpva7y7-cloud-bin/test-product/hezuoicon.png"
          mode="aspectFit"
        ></image>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.myApply {
  padding: 24rpx;

  .item {
    margin-bottom: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 56rpx;
    height: 202rpx;
    border-radius: 8rpx;
    background: rgba(255, 248, 248, 1);
    border: 2rpx solid rgba(255, 255, 255, 1);
    box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);

    .left {
      .title {
        font-size: 40rpx;
        color: $jel-font-title;
        font-family: 'YouSheBiaoTiHei', 'Microsoft YaHei', sans-serif;
      }

      .lookBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140rpx;
        height: 48rpx;
        color: #ffffff;
        font-size: 24rpx;
        background-color: $jel-brandColor;
        border-radius: 24rpx;
      }
    }

    .backIcon {
      width: 120rpx;
      height: 120rpx;
    }
  }
}
</style>
