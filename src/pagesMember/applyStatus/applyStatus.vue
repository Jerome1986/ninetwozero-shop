<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { applyGetApi } from '@/api/apply.ts'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import type { cooperateItem, HireItem } from '@/types/Apply'
import { formatTimestamp } from '@/utils/formatTimestamp.ts'

const userStore = useUserStore()

const applyList = ref<HireItem | cooperateItem>()
const applyListGet = async (applyType: string) => {
  if (applyType) {
    const res = await applyGetApi(userStore.profile._id, applyType)
    console.log(res)
    applyList.value = res!.data
  }
}

const applyType = ref('')
onLoad(async (options) => {
  console.log(options)
  if (options) {
    applyType.value = options.applyType
    await applyListGet(applyType.value)
  }
})
</script>

<template>
  <view class="applyStatus">
    <view class="item">
      <!-- 标题 -->
      <view class="title">
        <view class="text">基本信息</view>
        <!-- 根据审核进度分别用颜色区分显示审核状态 -->
        <view class="state examineState" v-if="applyList?.reviewStatus === '审核中'"
          >{{ applyList?.reviewStatus }}
        </view>
        <view class="state approvedState" v-if="applyList?.reviewStatus === '已通过'"
          >{{ applyList?.reviewStatus }}
        </view>
        <view class="state refuseState" v-if="applyList?.reviewStatus === '已拒绝'"
          >{{ applyList?.reviewStatus }}
        </view>
      </view>
      <!-- 内容 -->
      <view class="content">
        <view class="info">
          <view class="info-title">姓名</view>
          <view class="info-value">{{ applyList?.name }}</view>
        </view>
        <view class="info">
          <view class="info-title">电话</view>
          <view class="info-value">{{ applyList?.mobile }}</view>
        </view>
        <view class="info">
          <view class="info-title">类型</view>
          <view class="info-value">{{ applyType === 'hire' ? '应聘申请' : '合作申请' }}</view>
        </view>
        <view class="info">
          <view class="info-title">时间</view>
          <view class="info-value">{{ formatTimestamp(applyList?.creatAt) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.applyStatus {
  padding: 24rpx;

  .item {
    padding: 24rpx;
    background-color: #ffffff;
    border-radius: 8rpx;
    /*标题*/
    .title {
      margin-bottom: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      color: $jel-font-title;

      /*审核状态*/
      .state {
        font-size: 24rpx;
      }

      /*审核中*/
      .examineState {
        color: $jel-font-prompt;
      }

      /*已通过*/
      .approvedState {
        color: $jel-font-success;
      }

      /*已拒绝*/
      .refuseState {
        color: $jel-brandColor;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 24rpx;

      .info {
        display: flex;
        align-items: flex-end;
        gap: 40rpx;
        font-size: 28rpx;

        .info-title {
          width: fit-content;
          height: 40rpx;
          color: $jel-font-dec2;
        }

        .info-value {
          flex: 1;
          height: 40rpx;
          color: $jel-font-title;
        }
      }
    }
  }
}
</style>
