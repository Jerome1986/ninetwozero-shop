<script setup lang="ts">
import { ref } from 'vue'
import { managerOrderGetApi } from '@/api/order.ts'
import { useManagerStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import type { OrderData } from '@/types/ManagerOrder'
import { formatTimestamp } from '@/utils/formatTimestamp.ts'

// 定义store
const managerStore = useManagerStore()

// tab选项
const order = [
  { id: '1', state: '全部' },
  { id: '2', state: '备货中' },
  { id: '3', state: '待取货' },
  { id: '4', state: '已完成' },
  { id: '5', state: '已取消' },
]

// 激活下标
const activeIndex = ref(0)

// 根据订单状态和门店id获取订单
const orderList = ref<OrderData[]>([])
const orderListGet = async (storeId: string, managerId: string, orderState: string = '') => {
  const res = await managerOrderGetApi(storeId, managerId, orderState)
  orderList.value = res.data
}
onLoad(() => {
  if (managerStore.managerInfo) {
    orderListGet(managerStore.managerInfo?.storeId, managerStore.managerInfo?.managerId)
  }
})

// 处理tab点击
const handleOrder = (state: string, index: number) => {
  activeIndex.value = index
  if (managerStore.managerInfo) {
    orderListGet(managerStore.managerInfo?.storeId, managerStore.managerInfo?.managerId, state)
  }
}

// 跳转订单详情
const handleOrderDetail = (orderId?: string) => {
  if (orderId) {
    uni.navigateTo({
      url: `/pages/orderDetail/orderDetail?orderId=${orderId}`,
    })
  }
}
</script>
<template>
  <scroll-view class="orderList" :scroll-y="true">
    <!--  tab  -->
    <view class="tabList">
      <view
        class="tabItem"
        :class="{ tabActive: activeIndex === index }"
        v-for="(item, index) in order"
        :key="item.id"
        @click="handleOrder(item.state, index)"
        >{{ item.state }}
      </view>
    </view>
    <!--  对应的订单列表  -->
    <view class="list" v-if="orderList.length > 0">
      <view
        class="item"
        v-for="item in orderList"
        :key="item._id"
        @click="handleOrderDetail(item._id)"
      >
        <view class="left">
          <view class="dec">进货申请</view>
          <view class="time">下单时间：{{ formatTimestamp(item.creatAt, 2) }}</view>
        </view>
        <view class="state stateA" v-if="item.state === '备货中'">{{ item.state }}</view>
        <view class="state stateB" v-if="item.state === '待取货'">{{ item.state }}</view>
        <view class="state stateC" v-if="item.state === '已完成'">{{ item.state }}</view>
        <view class="state stateD" v-if="item.state === '已取消'">{{ item.state }}</view>
      </view>
    </view>
    <!-- 购物车空状态 -->
    <view class="cart-blank" v-else>
      <image src="/static/images/empty.png" class="image" />
      <text class="text">当前没有订单</text>
      <navigator open-type="switchTab" url="/pages/shop/shop" hover-class="none">
        <button class="button">去看看</button>
      </navigator>
    </view>
  </scroll-view>
</template>
<style scoped lang="scss">
.orderList {
  padding: 24rpx 24rpx 100rpx;
  width: 100%;
  height: 100%;
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

  /*订单列表*/
  .list {
    margin-top: 24rpx;

    .item {
      margin-bottom: 24rpx;
      padding: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background-color: #ffffff;
      border-radius: 8rpx;

      .left {
        /*下单说明*/
        .dec {
          margin-bottom: 8rpx;
          font-size: 28rpx;
          color: $jel-font-title;
        }

        /*下单时间*/
        .time {
          font-size: 24rpx;
          color: $jel-font-dec;
        }
      }

      /*状态*/
      .state {
        font-size: 24rpx;
      }

      /*备货中*/
      .stateA {
        color: #ff6b19;
      }

      /*待取货*/
      .stateB {
        color: #d62731;
      }

      /*已完成*/
      .stateC {
        color: #27b20b;
      }

      /*已取消*/
      .stateD {
        color: $jel-font-dec;
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
}
</style>
