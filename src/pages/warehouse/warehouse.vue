<script setup lang="ts">
import User from '@/pages/warehouse/components/User.vue'
import { useCartStore, useUserStore } from '@/stores'

const { safeAreaInsets } = uni.getSystemInfoSync()

// 定义store
const userStore = useUserStore()
const cartStore = useCartStore()

// 选中
const onChecked = (brand: string, model: string, itemId: string, selected: boolean) => {
  console.log('checked', selected)
  cartStore.setSelected(brand, model, itemId, selected)
}

// 减少
const subProNum = (brand: string, model: string, id: string, skuId: string, num: number) => {
  console.log('subProNum', brand, model, id, skuId, num)
  if (num <= 1) {
    cartStore.removeCartItem(brand, model, id, skuId)
  } else {
    cartStore.decreaseQuantity(brand, model, id, skuId)
  }
}

// 增加
const addProNum = (brand: string, model: string, id: string, skuId: string, num: number) => {
  console.log('addProNum')
  if (num >= 99) return

  cartStore.increaseQuantity(brand, model, id, skuId)
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

  <!--  店长--对应购物车功能进货   -->
  <view class="manager" v-else :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
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
                  <view class="attrsText ellipsis">{{ p.selectSku.name }}</view>
                </view>
              </navigator>

              <!-- 商品数量 -->
              <view class="count">
                <view class="price">￥{{ p.selectSku.price.toFixed(2) }}</view>

                <view class="numStep">
                  <text
                    class="text"
                    @tap="subProNum(brand.brand, model.model, p.id, p.selectSku.skuId, p.quantity)"
                    >-
                  </text>
                  <input class="input" :disabled="true" type="number" :value="String(p.quantity)" />
                  <text
                    class="text"
                    @tap="addProNum(brand.brand, model.model, p.id, p.selectSku.skuId, p.quantity)"
                    >+
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 吸底工具栏 -->
    <view class="toolbar" v-if="cartStore.cartTotal">
      <view class="leftTotal">
        <text class="text">合计：</text>
        <text class="amount">{{ cartStore.cartTotal.toFixed(2) }}</text>
      </view>
      <view class="button-group">
        <view @click="orderSubmit" class="button payment-button"> 提交订单</view>
      </view>
    </view>

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
    padding-bottom: 144rpx;

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
        margin: 16rpx 0;
        border-radius: 12rpx;

        &:nth-last-child(1) {
          margin-bottom: 0;
        }

        .goods {
          padding: 24rpx;
          display: flex;
          align-items: center;
          width: 100%;
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
                word-break: break-all; // 允许在任何字符换行，适配长型号/斜杠/英文
                overflow-wrap: anywhere; // 进一步保证可断行
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

              .text {
                width: 70rpx;
                height: 60rpx;
                line-height: 60rpx;
                text-align: center;
                background-color: $jel-border;
                border-radius: 8rpx;
                color: $jel-font-title;
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
  }

  // 吸底工具栏
  .toolbar {
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 16rpx 24rpx 24rpx;
    width: 100%;
    z-index: 999;
    background-color: #fff;
    border-top: 1px solid $jel-border;
    border-bottom: 1px solid $jel-border;
    // 左边合计
    .leftTotal {
      display: flex;
      align-items: center;

      .text {
        height: 60rpx;
        font-size: 32rpx; /* 即便大小不同也能对齐底线 */
        color: $jel-font-title;
      }

      .amount {
        height: 60rpx;
        font-size: 36rpx;
        font-weight: bold;
        color: $jel-brandColor;
      }
    }

    //  右边提交按钮
    .button-group {
      padding: 16rpx 30rpx;
      background-color: $jel-brandColor;
      color: #ffffff;
      border-radius: 40rpx;
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
