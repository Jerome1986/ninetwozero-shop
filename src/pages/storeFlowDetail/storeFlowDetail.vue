<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { formatTimestamp, getRecentMonths } from '@/utils/formatTimestamp.ts'
import type { StoreOrderFlow } from '@/types/Flow'
import { useCommissionStore, useManagerStore } from '@/stores'
import { checkParentStoreApi, filterFlowApi } from '@/api/store.ts'

// 定义store
const managerStore = useManagerStore()
const commissionStore = useCommissionStore()

// 默认高亮下标
const activeIndex = ref(0)
// tab文本
const tab = ref([
  { id: '1', text: '今日' },
  { id: '2', text: '昨日' },
  { id: '3', text: '本周' },
])

// 处理tab点击
const handleTab = (text: string, index: number) => {
  activeIndex.value = index
  console.log('tab', text)
  // 重置月份筛选
  value.value = ''
  // 根据标签内容筛选流水
  if (managerStore.managerInfo) {
    switch (text) {
      case '今日':
        filterFlow(managerStore.managerInfo?.storeId, 'today')
        break
      case '昨日':
        filterFlow(managerStore.managerInfo?.storeId, 'yesterday')
        break
      case '本周':
        filterFlow(managerStore.managerInfo?.storeId, 'thisWeek')
        break
    }
  }
}

// 流水列表
const flowList = ref<StoreOrderFlow[]>([])
const incomeFLow = ref<StoreOrderFlow[]>([])
const expenseFlow = ref<StoreOrderFlow[]>([])

// 收入总和和支出总和
const incomeTotal = computed(() => {
  return incomeFLow.value.reduce((sum, item) => sum + item.amount, 0)
})
const expenseTotal = computed(() => {
  return expenseFlow.value.reduce((sum, item) => sum + item.amount, 0)
})

// 绑定选中的 value，例如 '2025-09'
const value = ref('')
// 下拉框存放的数据
const range = ref<{ value: string; text: string }[]>([])

// 处理当日期选择发生改变时
const year = ref<number>(0)
const month = ref<number>(1)
const handleDateChange = (value: string | number) => {
  console.log('handleDateChange', value)
  const [yearStr, monthStr] = String(value).split('-')

  year.value = Number(yearStr) // 2025
  month.value = Number(monthStr) // 5

  if (managerStore.managerInfo) {
    filterFlow(managerStore.managerInfo?.storeId, 'month', year.value, month.value)
  }

  // 当选择月份时重置下标 3 不存在即取消高亮
  activeIndex.value = 3
}

// 根据条件筛选门店流水
const flowTotal = ref<number>(0)
const filterFlow = async (storeId: string, range: string, year?: number, month?: number) => {
  const res = await filterFlowApi(storeId, range, year, month)
  console.log('筛选结果', res)
  flowList.value = res.data.flowList
  flowTotal.value = res.data.totalAmount
  console.log('收入合计', flowTotal.value)
  incomeFLow.value = flowList.value.filter((flow) => flow.type === 'income')
  expenseFlow.value = flowList.value.filter((flow) => flow.type === 'expense')
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

// 计算总收益
const totalRevenue = computed(() => {
  const income = incomeTotal.value
  const expense = expenseTotal.value

  const platformRate = commissionStore.platformRate ?? 0
  const level1Rate = commissionStore.level1Rate ?? 0
  const level2Rate = commissionStore.level2Rate ?? 0

  if (income <= 0) return 0

  // 平台佣金
  const platformFee = income * platformRate

  // 上下级佣金
  let upstreamFee = 0
  if (firstStoreId.value) upstreamFee += income * level1Rate
  if (secondStoreId.value) upstreamFee += income * level2Rate

  // 总收益
  const net = income - platformFee - upstreamFee - expense
  console.log('总收益', net)
  // 保留两位小数
  return Math.round(net * 100) / 100
})

onLoad(() => {
  // 获取下拉框的所有选择值
  range.value = getRecentMonths(12)
  // 默认为请选择--下拉框的默认值
  value.value = ''
  // 默认显示今日流水
  if (managerStore.managerInfo) {
    filterFlow(managerStore.managerInfo?.storeId, 'today')
    checkParent(managerStore.managerInfo?.storeId)
  }
  commissionStore.commissionRoleGet()
})
</script>
<template>
  <view class="storeFlowDetail">
    <!-- 门店信息  -->
    <view class="shopInfo">
      <view class="left">
        <view class="shopLogo">
          <image :src="managerStore.managerInfo?.storeLogo" mode="aspectFit"></image>
        </view>
        <view class="info">
          <view class="shopName">{{ managerStore.managerInfo?.name }}</view>
          <view class="shopAddress">{{ managerStore.managerInfo?.address }}</view>
        </view>
      </view>
      <view class="total">
        <view class="summary-income">收入：￥{{ incomeTotal.toFixed(2) }}</view>
        <view class="summary-expense">支出：￥{{ expenseTotal.toFixed(2) }}</view>
        <view class="revenue">收益：￥{{ totalRevenue.toFixed(2) }}</view>
      </view>
    </view>
    <!-- 头部  -->
    <view class="header">
      <!--  tab  -->
      <view class="tabList">
        <view
          class="tabItem"
          v-for="(item, index) in tab"
          :class="{ tabActive: activeIndex === index }"
          :key="item.id"
          @click="handleTab(item.text, index)"
          >{{ item.text }}
        </view>
      </view>
      <!--  年月下拉框  -->
      <view class="date">
        <uni-data-select
          class="uni-data-select"
          mode="none"
          v-model="value"
          :localdata="range"
          :clear="false"
          @change="handleDateChange"
        ></uni-data-select>
      </view>
    </view>
    <!--  内容-流水区域  -->
    <view class="list" v-if="flowList.length > 0">
      <view class="item" v-for="item in flowList" :key="item._id">
        <view class="left">
          <view class="dec">{{ item.description }}</view>
          <view class="time">时间：{{ formatTimestamp(item.createdAt, 2) }}</view>
        </view>
        <view class="price" v-if="item.type === 'income'">+￥{{ item.amount }}</view>
        <view class="price" v-else>-￥{{ item.amount }}</view>
      </view>
    </view>
    <!-- 流水空状态 -->
    <view class="cart-blank" v-else>
      <image src="/static/images/empty.png" class="image" />
      <text class="text">本次查询没有数据，要努力拉~</text>
    </view>
    <!-- 底部占位 -->
    <view class="toolbar-height"></view>
  </view>
</template>

<style scoped lang="scss">
.storeFlowDetail {
  padding: 24rpx;

  /*门店信息*/
  .shopInfo {
    margin-bottom: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .left {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .shopLogo {
        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 16rpx;
        }
      }

      .info {
        color: $jel-font-title;

        .shopName {
          font-size: 28rpx;
        }

        .shopAddress {
          font-size: 24rpx;
          color: $jel-font-dec;
        }
      }
    }

    .total {
      display: flex;
      flex-direction: column;
      font-size: 24rpx;
      color: $jel-font-title;
    }
  }

  /* 头部 */
  .header {
    margin-bottom: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*tab*/
    .tabList {
      display: flex;
      border-radius: 8rpx;
      width: fit-content;
      overflow: hidden;

      .tabItem {
        padding: 8rpx 12rpx;
        width: fit-content;
        height: 50rpx;
        font-size: 24rpx;
        color: $jel-font-title;
        background-color: #e8e8e8;
      }

      .tabActive {
        color: #ffffff;
        background-color: $jel-brandColor;
      }
    }

    /*日期*/
    .date {
      width: 200rpx;

      :deep(.uni-select) {
        font-size: 24rpx;
        background-color: #f8f8f8;
      }
    }
  }

  /*流水*/
  .list {
    .item {
      margin-bottom: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 28rpx;
      border-bottom: 1px solid $jel-border;

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .dec {
          margin-bottom: 8rpx;
          color: $jel-font-title;
        }

        .time {
          font-size: 24rpx;
          color: $jel-font-dec;
        }
      }

      .price {
        color: $jel-brandColor;
      }
    }
  }

  // 空状态
  .cart-blank {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 60vh;

    .image {
      width: 160rpx;
      height: 200rpx;
    }

    .text {
      color: $jel-font-title;
      font-size: 26rpx;
      margin: 20rpx 0;
    }

    .button {
      width: 240rpx !important;
      height: 60rpx;
      line-height: 60rpx;
      margin-top: 20rpx;
      font-size: 26rpx;
      border-radius: 60rpx;
      color: #fff;
      background-color: $jel-brandColor;
    }
  }

  // 底部占位空盒子
  .toolbar-height {
    height: 100rpx;
  }
}
</style>
