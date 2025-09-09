<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { businessListApi, checkParentStoreApi, filterFlowApi } from '@/api/store.ts'
import { useCommissionStore, useManagerStore } from '@/stores'
import type { StoreOrderFlow } from '@/types/Flow'
import type { StoreItem } from '@/types/StoreItem.d..ts'

// 定义store
const managerStore = useManagerStore()
const commissionStore = useCommissionStore()

// 页面基础数据
const selfStore = ref({
  name: '自营门店',
  today: 0,
  yesterday: 0,
  week: 0,
  month: 0,
})

// 自营门店合计营业额
const flowTotal = ref<number>(0)
const filterFlow = async (storeId: string, range: string, year?: number, month?: number) => {
  const res = await filterFlowApi(storeId, range, year, month)
  console.log('筛选结果', res)
  flowTotal.value = res.data.totalAmount
  return res.data.totalAmount
}

// 一级流水
const firstFlow = ref<StoreOrderFlow[]>([])
// 二级流水
const subFlow = ref<StoreOrderFlow[]>([])
// 下级所有的流水列表
const flowList = ref<StoreOrderFlow[]>([])
const businessList = ref<StoreItem[]>([])
// 获取下级门店和下级门店流水列表
const businessListGet = async (storeId: string) => {
  const res = await businessListApi(storeId)
  console.log('下级门店', res)
  // 所有的下级门店列表
  businessList.value = [...res.data.firstStore, ...res.data.subStore]
  // 一级流水
  firstFlow.value = res.data.firstFlow
  // 二级流水
  subFlow.value = res.data.subFlow
  // 将一级和二级的流水合并
  flowList.value = [...res.data.firstFlow, ...res.data.subFlow]
}

// 查询当前门店是否有上级，用于计算门店实际收益
const firstStoreId = ref<string | null>(null)
const secondStoreId = ref<string | null>(null)
const checkParent = async (storeId: string) => {
  const res = await checkParentStoreApi(storeId)
  console.log('checkParent', res)
  firstStoreId.value = res.data.firstStoreId
  secondStoreId.value = res.data.secondStoreId
}

// 计算自营门店总收益
const totalSelfRevenue = computed(() => {
  // 总营业额
  const total = flowTotal.value
  // 平台佣金比例
  const platform = commissionStore.platformRate ?? 0
  // 直属上级
  const level1 = commissionStore.level1Rate ?? 0
  // 上级的上级
  const level2 = commissionStore.level2Rate ?? 0

  if (!firstStoreId.value) {
    // 没有任何上级
    return total * (1 - platform)
  } else if (!secondStoreId.value) {
    // 只有直属上级
    return total * (1 - platform - level1)
  } else {
    // 有两层上级
    return total * (1 - platform - level1 - level2)
  }
})

// 计算下级门店总收益
const totalSubRevenue = computed(() => {
  return (
    firstFlow.value.reduce((sum, item) => sum + item.amount, 0) * commissionStore.level1Rate +
    subFlow.value.reduce((sum, item) => sum + item.amount, 0) * commissionStore.level2Rate
  )
})

// 合计总收益
const totalRevenue = computed(() => {
  return totalSelfRevenue.value + totalSubRevenue.value
})

// 计算单个店流水的总和
const shopItemTotal = (storeId: string) => {
  const filterFlow = flowList.value.filter((flow) => flow.storeId === storeId)
  return filterFlow.reduce((sum, item) => sum + item.amount, 0)
}

onLoad(async () => {
  // 构建当前日期，获取现在的年月用于查询本月流水
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  if (managerStore.managerInfo) {
    await businessListGet(managerStore.managerInfo.storeId)
    selfStore.value.today = await filterFlow(managerStore.managerInfo?.storeId, 'today')
    selfStore.value.yesterday = await filterFlow(managerStore.managerInfo?.storeId, 'yesterday')
    selfStore.value.week = await filterFlow(managerStore.managerInfo?.storeId, 'thisWeek')
    selfStore.value.month = await filterFlow(
      managerStore.managerInfo?.storeId,
      'month',
      year,
      month,
    )
    await checkParent(managerStore.managerInfo?.storeId)
  }
  await commissionStore.commissionRoleGet()
})
</script>

<template>
  <view class="my-revenue">
    <scroll-view class="scrollView" :scroll-y="true" :enhanced="true" :show-scrollbar="false">
      <!-- 汇总卡片 -->
      <view class="summary-card">
        <view class="summary-row">
          <view class="item">
            <text class="value">¥ {{ totalRevenue.toFixed(2) }}</text>
            <text class="label">总收益</text>
          </view>
          <view class="item">
            <text class="value">¥ {{ totalSelfRevenue.toFixed(2) }}</text>
            <text class="label">自营门店</text>
          </view>
          <view class="item">
            <text class="value">¥ {{ totalSubRevenue.toFixed(2) }}</text>
            <text class="label">下级门店</text>
          </view>
        </view>
      </view>

      <!-- 自营门店营业额 -->
      <view class="section">
        <view class="section-head">
          <text class="bar"></text>
          <text class="title">自营门店营业额</text>
        </view>
        <view class="card">
          <view class="store-name">{{ selfStore.name }}</view>
          <view class="kpis">
            <view class="kpi">
              <text class="label">今日</text>
              <text class="amount brand">¥{{ selfStore.today.toFixed(2) }}</text>
            </view>
            <view class="kpi">
              <text class="label">昨日</text>
              <text class="amount">¥{{ selfStore.yesterday.toFixed(2) }}</text>
            </view>
            <view class="kpi">
              <text class="label">本周</text>
              <text class="amount">¥{{ selfStore.week.toFixed(2) }}</text>
            </view>
            <view class="kpi">
              <text class="label">本月</text>
              <text class="amount">¥{{ selfStore.month.toFixed(2) }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 下级管理门店营业额 -->
      <view class="section">
        <view class="section-head">
          <text class="bar"></text>
          <text class="title">下级管理门店营业额</text>
        </view>
        <view class="substores">
          <view class="sub-card" v-for="s in businessList" :key="s._id">
            <view class="row">
              <text class="name">{{ s.name }}</text>
              <text class="month brand">¥{{ shopItemTotal(s.storeId) }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="bottom-space"></view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.my-revenue {
  height: 100%;
  background-color: $jel-pageBackGroundColor;

  .scrollView {
    height: 100%;
    padding: 24rpx;
    box-sizing: border-box;
  }

  /* 汇总卡片 */
  .summary-card {
    background: linear-gradient(180deg, #fff 0%, #fff5f5 100%);
    border: 1rpx solid #ffe1e3;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;

    .summary-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16rpx;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .value {
          font-size: 34rpx;
          font-weight: 700;
          color: $jel-font-title;
        }

        .label {
          margin-top: 6rpx;
          font-size: 24rpx;
          color: $jel-font-dec2;
        }
      }
    }
  }

  /* 区块标题 */
  .section {
    margin-bottom: 24rpx;

    .section-head {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;

      .bar {
        width: 8rpx;
        height: 28rpx;
        border-radius: 4rpx;
        background-color: $jel-brandColor;
        margin-right: 12rpx;
      }

      .title {
        font-size: 28rpx;
        color: $jel-font-title;
        font-weight: 600;
      }
    }

    .card {
      background-color: #fff;
      border-radius: 12rpx;
      padding: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);

      .store-name {
        font-size: 28rpx;
        color: $jel-font-dec2;
        margin-bottom: 12rpx;
      }

      /* 自营门店 KPI 一行显示，内部上下排列 */
      .kpis {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16rpx;

        .kpi {
          background-color: #fafafa;
          border-radius: 8rpx;
          padding: 16rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;

          .label {
            font-size: 24rpx;
            color: $jel-font-dec;
          }

          .amount {
            margin-top: 6rpx;
            font-size: 26rpx;
            color: $jel-font-title;
            font-weight: 600;
          }

          .brand {
            color: $jel-brandColor;
          }
        }
      }
    }

    .substores {
      display: flex;
      flex-direction: column;
      gap: 16rpx;

      .sub-card {
        background-color: #fff;
        border-radius: 12rpx;
        padding: 24rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);

        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .name {
            font-size: 28rpx;
            color: $jel-font-title;
          }

          .month {
            font-size: 28rpx;
          }

          .brand {
            color: $jel-brandColor;
          }
        }
      }
    }
  }

  .bottom-space {
    height: 120rpx;
  }
}
</style>
