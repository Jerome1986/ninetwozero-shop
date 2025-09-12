<script setup lang="ts">
import { ref } from 'vue'
import { orderCancelledApi, userVipOrderGetApi } from '@/api/order.ts'
import { useUserStore } from '@/stores'
import type { VipOrderItem } from '@/types/VipOrderItem.ts'
import { onLoad } from '@dcloudio/uni-app'
import { formatOrderState, formatTimestamp } from '@/utils/formatTimestamp.ts'
import { generateOrderNo } from '@/utils/randomOrderNo.ts'
import { wxPayApi } from '@/api/wx.ts'
import { userInfoGetApi } from '@/api/users.ts'

// 定义store
const userStore = useUserStore()

// tag列表
const tagList = ref([
  { id: 'tag1', text: 'ALL' },
  { id: 'tag2', text: 'PAID' },
  { id: 'tag3', text: 'CANCELLED' },
  { id: 'tag4', text: 'REFUNDED' },
])

// 默认下标
const activeIndex = ref(0)
// 状态发生改变时
const handleTag = (text: string, index: number) => {
  activeIndex.value = index
  vipOrderListGet(userStore.profile._id, text)
}

// 订单列表
const orderList = ref<VipOrderItem[]>([])
const vipOrderListGet = async (userId: string, status: string) => {
  const res = await userVipOrderGetApi(userId, status)
  orderList.value = res.data
  console.log('订单列表', res)
}

// 跳转订单详情
const handleGoDetail = (orderNo: string) => {
  console.log(orderNo)
  uni.navigateTo({
    url: `/pagesMember/userOrderDetail/userOrderDetail?orderNo=${orderNo}`,
  })
}

// 处理再次购买
const handleAgainBuy = async (orderItem: VipOrderItem) => {
  console.log(orderItem)
  // 随机生成订单号--用于前端查询
  const orderNo = generateOrderNo('user')
  // 1.向后端发起支付请求
  if (orderItem._id) {
    const payRes = await wxPayApi(
      orderNo,
      userStore.profile._id,
      orderItem.vipId,
      orderItem.vipLevel,
      orderItem.vipLevelText,
      orderItem.discount,
      orderItem.giftCount,
      orderItem.term,
      orderItem.amount,
      orderItem.vipLevelText,
    )
    console.log(payRes)
    // 2.通过后端返回参数、发起前端微信支付
    wx.requestPayment({
      timeStamp: payRes.data.timeStamp,
      nonceStr: payRes.data.nonceStr,
      package: payRes.data.packageValue,
      signType: payRes.data.signType,
      paySign: payRes.data.paySign,
      async success(res) {
        // 3.支付成功后-重新获取更新的数据（实际的更新动作由后端完成）
        const userRes = await userInfoGetApi(userStore.profile._id)
        console.log('支付成功', res)
        const { openid, ...newData } = userRes.data
        userStore.setProfile(newData)
        await uni.showToast({ icon: 'success', title: '支付成功' })

        // 支付跳转
        setTimeout(() => {
          uni.switchTab({ url: '/pages/my/my' })
        }, 800)
      },
      async fail(err) {
        // 直接更新订单为已取消
        console.error('支付失败', err)
        const res = await orderCancelledApi(orderNo)
        console.log('取消支付结果', res)
        await uni.showToast({
          icon: 'none',
          title: '取消支付',
        })
      },
    })
  }
}

onLoad(() => vipOrderListGet(userStore.profile._id, 'ALL'))
</script>

<template>
  <view class="vip-order">
    <!-- 筛选标签（仅样式） -->
    <view class="filter-bar">
      <view
        class="tag"
        v-for="(item, index) in tagList"
        :key="item.id"
        :class="{ active: activeIndex === index }"
        @click="handleTag(item.text, index)"
      >
        {{ formatOrderState(item.text) }}
      </view>
    </view>

    <!-- 订单列表 -->
    <scroll-view
      class="list"
      :scroll-y="true"
      :enhanced="true"
      :show-scrollbar="false"
      v-if="orderList.length > 0"
    >
      <view
        class="order-card"
        v-for="item in orderList"
        :key="item._id"
        @click="handleGoDetail(item.out_trade_no)"
      >
        <!-- 头部：会员级别 + 状态 -->
        <view class="card-head">
          <view class="left">
            <view class="vip-badge"></view>
            <view class="level">{{ item.vipLevelText }}</view>
          </view>
          <view
            class="status"
            :class="{
              paid: item.status === 'PAID',
              pending: item.status === 'PENDING',
              closed: item.status === 'CANCELLED',
            }"
            >{{ formatOrderState(item.status) }}
          </view>
        </view>

        <!-- 内容：权益速览 + 价格 -->
        <view class="card-body">
          <view class="features">
            <view class="feature">
              <text class="label">折扣</text>
              <text class="value">{{ item.discount }}折</text>
            </view>
            <view class="divider"></view>
            <view class="feature">
              <text class="label">赠送贴膜</text>
              <text class="value">{{ item.giftCount }}次</text>
            </view>
            <view class="divider"></view>
            <view class="feature">
              <text class="label">有效期</text>
              <text class="value">{{ item.term }}</text>
            </view>
          </view>

          <view class="price-row">
            <text class="symbol">￥</text>
            <text class="price">{{ item.amount.toFixed(2) }}</text>
          </view>
        </view>

        <!-- 底部信息：订单号/时间/支付方式 + 操作 -->
        <view class="card-foot">
          <view class="meta">
            <view class="row">
              <text class="label" style="width: fit-content">订单号</text>
              <text class="value">{{ item.out_trade_no }}</text>
            </view>
            <view class="row">
              <text class="label">下单时间</text>
              <text class="value">{{ formatTimestamp(item.createdAt, 2) }}</text>
            </view>
            <view class="row">
              <text class="label">支付方式</text>
              <text class="value">微信支付</text>
            </view>
          </view>

          <view class="actions">
            <view
              class="btn primary"
              v-if="item.status === 'CANCELLED'"
              @click.stop="handleAgainBuy(item)"
              >再次购买
            </view>
          </view>
        </view>
      </view>

      <view class="bottom-space"></view>
    </scroll-view>
    <!-- 购物车空状态 -->
    <view class="cart-blank" v-else>
      <image src="/static/images/empty.png" class="image" />
      <text class="text">当前没有任何订单</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.vip-order {
  height: 100%;
  background-color: $jel-pageBackGroundColor;
  padding: 24rpx;
  box-sizing: border-box;

  .filter-bar {
    display: flex;
    gap: 16rpx;
    margin-bottom: 16rpx;

    .tag {
      padding: 8rpx 20rpx;
      font-size: 24rpx;
      color: $jel-font-title;
      background-color: #fff;
      border-radius: 999rpx;
      border: 1rpx solid #f0f0f0;

      &.active {
        color: #fff;
        background-color: $jel-brandColor;
        border-color: $jel-brandColor;
      }
    }
  }

  .list {
    height: calc(100vh - 160rpx);
  }

  .order-card {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    margin-bottom: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
    overflow: hidden;

    .card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12rpx;

      .left {
        display: flex;
        align-items: center;
        gap: 12rpx;
        min-width: 0; // 允许收缩

        .vip-badge {
          width: 28rpx;
          height: 28rpx;
          border-radius: 50%;
          background: linear-gradient(180deg, #ffd66e, #ffb800);
          box-shadow: inset 0 2rpx 4rpx rgba(0, 0, 0, 0.08);
          flex-shrink: 0;
        }

        .level {
          font-size: 28rpx;
          color: $jel-font-title;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .status {
        padding: 6rpx 14rpx;
        font-size: 22rpx;
        border-radius: 999rpx;
        border: 1rpx solid #eee;
        color: $jel-font-title;
        flex-shrink: 0;

        &.paid {
          color: #27b20b;
          background-color: #eef9ee;
          border-color: #e0f2e0;
        }

        &.pending {
          color: #ff6b19;
          background-color: #fff3e9;
          border-color: #ffe3cc;
        }

        &.closed {
          color: #999;
          background-color: #f5f5f5;
          border-color: #eee;
        }
      }
    }

    .card-body {
      margin-top: 12rpx;

      .features {
        display: flex;
        align-items: center;
        background-color: #fafafa;
        border-radius: 12rpx;
        padding: 12rpx;
        overflow: hidden;

        .feature {
          flex: 1;
          text-align: center;

          .label {
            font-size: 22rpx;
            color: $jel-font-dec;
          }

          .value {
            margin-top: 4rpx;
            display: block;
            font-size: 26rpx;
            color: $jel-font-title;
            font-weight: 600;
          }
        }

        .divider {
          width: 1rpx;
          height: 28rpx;
          background-color: #eee;
        }
      }

      .price-row {
        margin-top: 16rpx;
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        color: $jel-brandColor;

        .symbol {
          font-size: 24rpx;
        }

        .price {
          font-size: 40rpx;
          font-weight: 700;
          margin-left: 4rpx;
        }
      }
    }

    .card-foot {
      margin-top: 16rpx;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16rpx;

      .meta {
        flex: 1 1 auto;
        min-width: 0; // 关键：允许内容收缩，启用省略
        display: grid;
        grid-template-columns: 140rpx 1fr; // 固定标签列，值列自适应
        row-gap: 8rpx;
        column-gap: 12rpx;
        align-items: center;

        .row {
          display: contents;
        }

        .label {
          font-size: 22rpx;
          color: $jel-font-dec;
        }

        .value {
          font-size: 24rpx;
          color: $jel-font-title;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; // 超长单行省略
        }
      }

      .actions {
        display: flex;
        gap: 12rpx;
        flex-shrink: 0; // 防止被挤压
        .btn {
          padding: 12rpx 22rpx;
          font-size: 24rpx;
          border-radius: 999rpx;
          white-space: nowrap;

          &.ghost {
            color: $jel-brandColor;
            border: 1rpx solid $jel-brandColor;
            background-color: #fff;
          }

          &.primary {
            color: #fff;
            background-color: $jel-brandColor;
          }
        }
      }
    }
  }

  .bottom-space {
    height: 80rpx;
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
