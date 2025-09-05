<script setup lang="ts">
import User from '@/pages/warehouse/components/User.vue'
//定义store
import { useCartStore, useUserStore } from '@/stores'

// 定义store
const userStore = useUserStore()
const cartStore = useCartStore()

// 选中
const onChecked = (brand: string, model: string, itemId: string, selected: boolean) => {
  console.log('checked', selected)
  cartStore.setSelected(brand, model, itemId, selected)
}

// 减少
const subProNum = (brand: string, model: string, itemId: string, num: number) => {
  console.log('subProNum')
  if (num <= 1) {
    cartStore.removeCartItem(brand, model, itemId)
  } else {
    cartStore.decreaseQuantity(brand, model, itemId)
  }
}

// 增加
const addProNum = (brand: string, model: string, itemId: string, num: number) => {
  console.log('addProNum')
  if (num >= 99) return

  cartStore.increaseQuantity(brand, model, itemId)
}

// 提交订单
const orderSubmit = () => {
  console.log('orderSubmit', cartStore.selectedItems)
  uni.navigateTo({
    url: '/pages/confirmOrder/confirmOrder',
  })
}
</script>
<template>
  <!--  用户端--对应员工招聘跳转  -->
  <User v-if="userStore.profile.role !== 'manager'"></User>
  <!--  店长--对应购物车功能进货  -->
  <view class="manager" v-else>
    <scroll-view class="cartList" :scroll-y="true" v-if="cartStore.cartList.length > 0">
      <!-- 品牌分组 -->
      <view class="brand-group" v-for="brand in cartStore.cartList" :key="brand.brand">
        <!-- 品牌标题 -->
        <view class="brand-title">
          <text class="iconfont icon-shouji"></text>
          <text class="name">{{ brand.brand }}</text>
        </view>

        <!-- 型号分组 -->
        <view class="info" v-for="model in brand.models" :key="model.model">
          <!-- 头部 -->
          <view class="head">
            <view class="text">产品信息</view>
            <view class="phoneType">机型：{{ model.model }}</view>
          </view>

          <!-- 商品项 -->
          <view class="proItem" v-for="p in model.items" :key="p.id">
            <view class="goods">
              <!-- 选中状态 -->
              <text
                @click="onChecked(brand.brand, model.model, p.id, p.selected)"
                class="checkbox"
                :class="{ checked: p.selected }"
              ></text>

              <navigator
                :url="`/pages/goods/goods?id=${p.id}`"
                hover-class="none"
                class="navigator"
              >
                <image mode="aspectFill" class="picture" :src="p.imageUrl"></image>
                <view class="meta">
                  <view class="name ellipsis">{{ p.name }}</view>
                  <view class="attrsText ellipsis">{{ p.description }}</view>
                </view>
              </navigator>

              <!-- 商品数量 -->
              <view class="count">
                <view class="price">￥{{ p.unitPrice.toFixed(2) }}</view>

                <view class="numStep">
                  <text class="text" @tap="subProNum(brand.brand, model.model, p.id, p.quantity)"
                    >-
                  </text>
                  <input class="input" :disabled="true" type="number" :value="String(p.quantity)" />
                  <text class="text" @tap="addProNum(brand.brand, model.model, p.id, p.quantity)"
                    >+
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 吸底工具栏 -->
      <view class="toolbar" v-if="cartStore.cartTotal">
        <text class="text">合计:</text>
        <text class="amount">{{ cartStore.cartTotal.toFixed(2) }}</text>
        <view class="button-group">
          <view @click="orderSubmit" class="button payment-button"> 提交订单</view>
        </view>
      </view>

      <!-- 底部占位 -->
      <view class="toolbar-height"></view>
    </scroll-view>

    <!-- 购物车空状态 -->
    <view class="cart-blank" v-else>
      <image src="/static/images/empty.png" class="image" />
      <text class="text">购物车还是空的，快来挑选好货吧</text>
      <navigator open-type="switchTab" url="/pages/shop/shop" hover-class="none">
        <button class="button">去看看</button>
      </navigator>
    </view>
  </view>
</template>

<style scoped lang="scss">
.manager {
  height: 100%;
  padding: 24rpx;

  .cartList {
    height: 100%;

    /* 品牌标题 */
    .brand-title {
      display: flex;
      align-items: center;
      padding: 16rpx 24rpx;
      background-color: #f8f8f8;
      margin-bottom: 16rpx;
      border-radius: 8rpx;

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

    /*产品信息-循环体*/
    .info {
      margin-bottom: 24rpx;
      padding: 24rpx;
      background-color: #fff;
      border-radius: 12rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

      /*机型*/
      .head {
        display: flex;
        align-items: center;
        gap: 16rpx;

        .text {
          color: $jel-font-title;
          font-size: 28rpx;
        }

        .phoneType {
          padding: 6rpx;
          font-size: 24rpx;
          color: $jel-brandColor;
          border: 1px solid $jel-brandColor;
          border-radius: 4rpx;
          background-color: #ffebec;
        }
      }

      /*产品*/
      .proItem {
        margin: 24rpx 0;
        padding: 20rpx;
        border: 1px solid $jel-border;
        border-radius: 12rpx;

        &:nth-last-child(1) {
          margin-bottom: 0;
        }

        .goods {
          display: flex;
          align-items: center;
          position: relative;

          .checkbox {
            width: 40rpx;
            height: 40rpx;
            border: 2rpx solid #ccc;
            border-radius: 50%;
            margin-right: 20rpx;

            &.checked {
              background-color: $jel-brandColor;
              border-color: $jel-brandColor;
              position: relative;

              &::after {
                content: '';
                position: absolute;
                left: 12rpx;
                top: 8rpx;
                width: 10rpx;
                height: 18rpx;
                border: solid #fff;
                border-width: 0 4rpx 4rpx 0;
                transform: rotate(45deg);
              }
            }
          }

          .navigator {
            display: flex;
            align-items: center;
            flex: 1;

            .picture {
              width: 120rpx;
              height: 120rpx;
              border-radius: 8rpx;
              margin-right: 20rpx;
            }

            /*信息区域*/
            .meta {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100rpx;

              .name {
                font-size: 28rpx;
                font-weight: 600;
                color: #333;
                @include ellipsis(1);
              }

              .attrsText {
                font-size: 24rpx;
                color: #999;
                margin: 8rpx 0;
                @include ellipsis(1);
              }
            }
          }

          .count {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-evenly;
            gap: 8rpx;
            height: 120rpx;

            .price {
              font-size: 28rpx;
              color: $jel-brandColor;
              font-weight: bold;
            }

            /*步进器*/
            .numStep {
              display: flex;
              align-items: center;
              margin-left: 20rpx;

              .text {
                width: 50rpx;
                height: 40rpx;
                text-align: center;
                background-color: #f0f0f0;
                font-size: 30rpx;
                color: #333;
              }

              .input {
                width: 60rpx;
                height: 50rpx;
                text-align: center;
                border: none;
              }
            }
          }
        }
      }
    }

    // 吸底工具栏
    .toolbar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: var(--window-bottom);
      z-index: 99;

      height: 100rpx;
      padding: 0 20rpx;
      display: flex;
      align-items: center;
      border-top: 1rpx solid #ededed;
      background-color: #fff;

      .text {
        margin-right: 8rpx;
        margin-left: 32rpx;
        color: #444;
        font-size: 14px;
      }

      .amount {
        font-size: 40rpx;
        color: $jel-brandColor;

        .decimal {
          font-size: 24rpx;
        }

        &::before {
          content: '￥';
          font-size: 24rpx;
        }
      }

      .button-group {
        margin-left: auto;
        display: flex;
        justify-content: space-between;
        text-align: center;
        line-height: 72rpx;
        font-size: 24rpx;
        color: #fff;

        .button {
          width: 240rpx;
          margin: 0 10rpx;
          border-radius: 72rpx;
        }

        .payment-button {
          background-color: $jel-brandColor;

          &.disabled {
            opacity: 0.6;
          }
        }
      }
    }

    // 底部占位空盒子
    .toolbar-height {
      height: 100rpx;
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
