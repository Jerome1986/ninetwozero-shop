<script setup lang="ts">
import { useCartStore, useManagerStore } from '@/stores'
import { ref } from 'vue'
import { managerOrderAddApi, managerOrderUpdateFlowApi } from '@/api/order.ts'
import type { OrderData } from '@/types/ManagerOrder'

// 安全距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//定义store
const cartStore = useCartStore()
const managerStore = useManagerStore()

console.log('所选择商品', cartStore.selectedItems)

// 订单参数
const orderData = ref<OrderData>({
  storeId: managerStore.managerInfo?.storeId,
  managerId: managerStore.managerInfo?.managerId,
  product: cartStore.selectedItems,
  total: cartStore.cartTotal,
  applicant: {
    name: managerStore.managerInfo?.managerName,
    shop: managerStore.managerInfo?.address,
    mobile: managerStore.managerInfo?.phone,
  },
})

// 确认订单提交入库
const submit = async () => {
  console.log('提交')
  const res = await managerOrderAddApi(orderData.value)
  if (res.data.insertedId) {
    const updateFlow = await managerOrderUpdateFlowApi(
      orderData.value.storeId,
      '补货',
      'expense',
      orderData.value.total,
    )
    await uni.showToast({
      icon: 'success',
      title: '下单成功',
    })

    console.log('流水更新', updateFlow)
    // 清空购物车
    cartStore.clearCart()
    // 跳转到首页
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/home/home',
      })
    }, 500)
  }
}
</script>

<template>
  <scroll-view class="confirmOrder" :scroll-y="true" :enhanced="true" :show-scrollbar="false">
    <view class="brand" v-for="cart in cartStore.selectedItems" :key="cart.brand">
      <!--  品牌头部   -->
      <view class="brand-title">
        <text class="iconfont icon-shouji"></text>
        <text class="name">{{ cart.brand }}</text>
      </view>
      <!--  品牌型号   -->
      <view class="model" v-for="m in cart.models" :key="m.model">
        <!-- 头部 -->
        <view class="head">
          <view class="text">机型：</view>
          <view class="phoneType">{{ m.model }}</view>
        </view>
        <!--  商品  -->
        <view class="proItem" v-for="p in m.items" :key="p.id">
          <!--  封面图  -->
          <view class="cover">
            <image :src="p.imageUrl"></image>
          </view>

          <!-- 商品信息 -->
          <view class="info">
            <view class="proLeft">
              <view class="name">{{ p.name }}</view>
              <view class="dec">{{ p.description }}</view>
            </view>
            <view class="proRight">
              <view class="price">￥{{ p.unitPrice }}</view>
              <view class="num">x{{ p.quantity }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 合计金额  -->
    <view class="totalOrder">
      <text style="color: #333333">合计金额</text>
      <text style="color: #d62731">￥{{ cartStore.cartTotal }}</text>
    </view>
    <!--  订单人信息  -->
    <view class="orderInfo">
      <view class="title">提货人信息</view>
      <view class="item">
        <view class="label">申请人</view>
        <view class="value">{{ managerStore.managerInfo?.managerName }}</view>
      </view>
      <view class="item">
        <view class="label">申请门店</view>
        <view class="value">{{ managerStore.managerInfo?.address }}</view>
      </view>

      <view class="item">
        <view class="label">联系方式</view>
        <view class="value">{{ managerStore.managerInfo?.phone }}</view>
      </view>
    </view>
    <!-- 吸底工具栏 -->
    <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      <button class="btn" @click="submit">确认订单</button>
    </view>
    <!-- 底部占位 -->
    <view class="toolbar-height"></view>
  </scroll-view>
</template>

<style scoped lang="scss">
.confirmOrder {
  padding: 24rpx;
  height: 100%;

  .brand {
    margin-bottom: 24rpx;
    padding: 24rpx;
    background-color: #ffffff;
    border-radius: 8rpx;
    /* 品牌标题 */
    .brand-title {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;

      .icon-shouji {
        margin-right: 8rpx;
        color: $jel-brandColor;
        font-size: 32rpx;
      }

      .name {
        font-size: 28rpx;
        font-weight: bold;
        color: $jel-font-title;
      }
    }

    /*机型*/
    .model {
      margin-bottom: 16rpx;
      /*型号头部信息*/
      .head {
        display: flex;
        align-items: center;
        margin-bottom: 24rpx;

        .text {
          color: $jel-font-title;
          font-size: 28rpx;
        }

        .phoneType {
          font-size: 24rpx;
          color: $jel-brandColor;
        }
      }

      /*商品*/
      .proItem {
        margin-bottom: 24rpx;
        display: flex;
        gap: 16rpx;

        .cover {
          height: 120rpx;
          width: 120rpx;
          border-radius: 8rpx;
          overflow: hidden;
        }

        .info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex: 1;

          .proLeft {
            .name {
              margin-bottom: 24rpx;
              font-size: 28rpx;
              color: $jel-font-title;
              @include ellipsis(1);
            }

            .dec {
              font-size: 24rpx;
              color: $jel-font-dec;
              @include ellipsis(1);
            }
          }

          .proRight {
            text-align: end;

            .price {
              font-size: 28rpx;
              color: $jel-brandColor;
            }

            .num {
              font-size: 24rpx;
              color: $jel-font-dec;
            }
          }
        }
      }
    }
  }

  /*合计金额*/
  .totalOrder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;
    padding: 16rpx;
    background-color: #fff;
  }

  /*订单信息区域*/
  .orderInfo {
    padding: 24rpx;
    background-color: #fff;
    border-radius: 8rpx;

    .title {
      margin-bottom: 16rpx;
      color: $jel-font-title;
    }

    .item {
      padding: 16rpx 0;
      margin-bottom: 16rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      .label {
        color: $jel-font-title;
      }

      .value {
        color: $jel-font-dec;
      }
    }
  }

  /* 底部工具栏 */
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

  // 底部占位空盒子
  .toolbar-height {
    height: 180rpx;
  }
}
</style>
