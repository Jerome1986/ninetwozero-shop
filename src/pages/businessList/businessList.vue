<script setup lang="ts">
import type { StoreItem } from '@/types/StoreItem.d..ts'
import { businessListApi } from '@/api/store.ts'
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useCommissionStore, useManagerStore } from '@/stores'
import type { CommissionTask } from '@/types/Flow'

// 定义store
const managerStore = useManagerStore()
const commissionStore = useCommissionStore()
// 一级门店
const firstBusinessList = ref<StoreItem[]>([])
// 二级门店
const subBusinessList = ref<StoreItem[]>([])
// 一级流水
const firstFlow = ref<CommissionTask[]>([])
// 二级流水
const subFlow = ref<CommissionTask[]>([])
// 总流水表
const flowList = ref<CommissionTask[]>([])
// 获取下级门店列表
const businessListGet = async (storeId: string) => {
  const res = await businessListApi(storeId)
  console.log('下级门店', res)
  // 将一级和二级分开显示
  firstBusinessList.value = res.data.firstStore
  subBusinessList.value = res.data.subStore
  // 一级流水
  firstFlow.value = res.data.firstFlow
  // 二级流水
  subFlow.value = res.data.subFlow
  // 将一级和二级的流水合并
  flowList.value = [...res.data.firstFlow, ...res.data.subFlow]
}

// 总门店数
const businessTotal = computed(() => {
  return firstBusinessList.value.length + subBusinessList.value.length
})

// 计算单个店流水的总和
const shopItemTotal = (storeId: string) => {
  const filterFlow = flowList.value.filter((flow) => flow.storeId === storeId)
  return filterFlow.reduce((sum, item) => sum + item.amount, 0)
}

// 计算所有店的流水总和
const shopTotal = computed(() => {
  return flowList.value.reduce((sum, item) => sum + item.amount, 0)
})

// 计算总收益
const totalRevenue = computed(() => {
  return (
    firstFlow.value.reduce((sum, item) => sum + item.amount, 0) * commissionStore.level1Rate +
    subFlow.value.reduce((sum, item) => sum + item.amount, 0) * commissionStore.level2Rate
  )
})

// todo 跳转门店收入详情
const handleShopFlow = (storeId: string) => {
  console.log('go', storeId)
}

onLoad(() => {
  if (managerStore.managerInfo) {
    businessListGet(managerStore.managerInfo.storeId)
  }
  commissionStore.commissionRoleGet()
})
</script>
<template>
  <view class="businessList">
    <!--  头部  -->
    <view class="header">
      <view class="label"
        >门店数：
        <text class="text" style="color: #27b20b">{{ businessTotal }}</text>
      </view>
      <view class="label"
        >门店收益：
        <text class="text" style="color: #ff6b19">￥{{ totalRevenue }}</text>
      </view>
      <view class="label"
        >总营业额：
        <text class="text" style="color: #d62731">￥{{ shopTotal.toFixed(2) }}</text>
      </view>
    </view>
    <!--  一级列表  -->
    <view class="list">
      <view
        class="item"
        v-for="item in firstBusinessList"
        :key="item._id"
        @click="handleShopFlow(item.storeId)"
      >
        <view class="left">
          <view class="shopLogo">
            <image :src="item.storeLogo" mode="aspectFit"></image>
          </view>
          <view class="info">
            <view class="top">
              <view class="name">{{ item.name }}</view>
              <image
                style="width: 40rpx; height: 40rpx"
                src="/static/images/first.png"
                mode="aspectFit"
              ></image>
            </view>
            <view class="flow">营业额：￥{{ shopItemTotal(item.storeId).toFixed(2) }}</view>
          </view>
        </view>
        <view class="icon">
          <text class="iconfont icon-bianzu"></text>
        </view>
      </view>
    </view>
    <!--  二级列表  -->
    <view class="list">
      <view
        class="item"
        v-for="item in subBusinessList"
        :key="item._id"
        @click="handleShopFlow(item.storeId)"
      >
        <view class="left">
          <view class="shopLogo">
            <image :src="item.storeLogo" mode="aspectFit"></image>
          </view>
          <view class="info">
            <view class="top">
              <view class="name">{{ item.name }}</view>
              <image
                style="width: 40rpx; height: 40rpx"
                src="/static/images/sub.png"
                mode="aspectFit"
              ></image>
            </view>
            <view class="flow">营业额：￥{{ shopItemTotal(item.storeId).toFixed(2) }}</view>
          </view>
        </view>
        <view class="icon">
          <text class="iconfont icon-bianzu"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.businessList {
  padding: 24rpx;

  /*头部*/
  .header {
    margin-bottom: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60rpx;
    font-size: 28rpx;
    color: $jel-font-title;
  }

  /*列表*/
  .list {
    /*每一项*/
    .item {
      margin-bottom: 24rpx;
      padding: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      border-radius: 16rpx;

      /*左侧门店信息*/
      .left {
        display: flex;
        align-items: center;
        gap: 16rpx;
        /*门店log*/
        .shopLogo {
          image {
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
          }
        }

        /*门店l信息*/
        .info {
          .top {
            display: flex;
            margin-bottom: 8rpx;
            font-size: 28rpx;
            color: $jel-font-title;
          }

          /*门店l流水*/
          .flow {
            font-size: 24rpx;
            color: $jel-font-dec;
          }
        }
      }

      /*右侧箭头图标*/
      .icon {
        .iconfont {
          color: $jel-font-dec;
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>
