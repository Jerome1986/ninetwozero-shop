<script setup lang="ts">
import { ref } from 'vue'
import type { ProductItem } from '@/types/ProductItem'
import { productByIdGetApi } from '@/api/product.ts'
import { onLoad } from '@dcloudio/uni-app'
import FooterBar from '@/pages/productDetail/components/FooterBar.vue'
import { useCartStore, useUserStore } from '@/stores'

// 定义store
const cartStore = useCartStore()
const userStore = useUserStore()

// 获取产品列表
const productData = ref<ProductItem>()
const productDataGet = async (productId: string, cateType: number) => {
  const res = await productByIdGetApi(productId, cateType)
  console.log(res)
  productData.value = res.data
}

// 商品类型--商品  礼品
const cateType = ref('')
onLoad(async (options) => {
  console.log(options)
  if (options) {
    cateType.value = options.cateType
    await productDataGet(options.productId, options.cateType)
  }
})

// 处理添加购物车
const isAdding = ref(false)

const handleAddCart = async (val: string) => {
  if (userStore.profile.role !== 'manager') {
    return uni.showModal({
      title: '提示',
      content: '仅供员工使用',
      showCancel: false,
      confirmColor: '#d62731',
    })
  }

  if (!productData.value?._id || isAdding.value) return
  isAdding.value = true

  try {
    const cartItem = {
      id: productData.value._id,
      selected: true,
      imageUrl: productData.value.cover,
      name: productData.value.name,
      description: productData.value.dec,
      unitPrice: productData.value.currentPrice,
      quantity: 1,
    }
    cartStore.addCartItem(productData.value.brand, productData.value.model, cartItem)

    await uni.showToast({
      icon: 'success',
      title: val === 'nowAdd' ? '已入库，正在跳转…' : '已加入库存',
      mask: true,
    })

    if (val === 'nowAdd') {
      // 保证 toast 展示完后再跳转
      setTimeout(() => {
        uni.switchTab({ url: '/pages/warehouse/warehouse' })
      }, 500)
    }
  } finally {
    isAdding.value = false
  }
}
</script>

<template>
  <scroll-view class="product-detail" :scroll-y="true">
    <!-- 轮播图 -->
    <swiper class="swiper" :indicator-dots="false" :autoplay="true" :circular="true">
      <swiper-item>
        <image :src="productData?.cover" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <!-- 产品信息 -->
    <view class="info-section">
      <view class="price-row">
        <view class="left">
          <view v-if="userStore.profile.role === 'manager'">
            <view class="price">
              <text class="symbol">￥</text>
              <text class="number">{{ productData?.currentPrice.toFixed(2) }}</text>
              <!--            <text class="number">非卖品</text>-->
            </view>
            <view class="original-price"> ￥{{ productData?.originalPrice.toFixed(2) }}</view>
          </view>
          <view style="color: #d62731">非卖品</view>
        </view>
        <view class="views">
          <text class="iconfont icon-zongliulanliang"></text>
          <text>{{ productData?.lookNum }}</text>
        </view>
      </view>
      <view class="title">{{ productData?.name }}</view>
      <view class="desc">{{ productData?.dec }}</view>
    </view>

    <!-- 选择规格 -->
    <view class="spec-section">
      <view class="section-title">选择规格</view>
      <view class="spec-content">
        <text>已选：默认规格</text>
        <text class="iconfont icon-arrow-right"></text>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="detail-section">
      <view class="section-title">商品详情</view>
      <view class="detail-content">
        <image
          v-for="(image, index) in productData?.proImages"
          :key="index"
          :src="image"
          mode="widthFix"
        ></image>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <FooterBar
      :cateType="cateType"
      @addCart="handleAddCart('addCart')"
      @nowAdd="handleAddCart('nowAdd')"
    ></FooterBar>
  </scroll-view>
</template>

<style scoped lang="scss">
.product-detail {
  min-height: 100vh;
  padding-bottom: 120rpx;

  // 轮播图
  .swiper {
    width: 100%;
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  // 产品信息区域
  .info-section {
    background-color: #fff;
    padding: 24rpx;
    margin-bottom: 24rpx;

    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rpx;

      .left {
        display: flex;
        align-items: baseline;

        .price {
          color: $jel-brandColor;

          .symbol {
            font-size: 32rpx;
          }

          .number {
            font-size: 48rpx;
            font-weight: bold;
          }
        }

        .original-price {
          margin-left: 16rpx;
          color: $jel-font-dec;
          font-size: 24rpx;
          text-decoration: line-through;
        }
      }

      .views {
        display: flex;
        align-items: center;
        gap: 4rpx;
        color: $jel-font-dec;
        font-size: 24rpx;

        .iconfont {
          font-size: 28rpx;
        }
      }
    }

    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: $jel-font-title;
      margin-bottom: 12rpx;
    }

    .desc {
      font-size: 24rpx;
      color: $jel-font-dec2;
    }
  }

  // 规格选择区域
  .spec-section {
    background-color: #fff;
    padding: 24rpx;
    margin-bottom: 24rpx;

    .section-title {
      font-size: 28rpx;
      font-weight: bold;
      color: $jel-font-title;
      margin-bottom: 16rpx;
    }

    .spec-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 26rpx;
      color: $jel-font-dec2;

      .iconfont {
        color: $jel-font-dec;
        font-size: 24rpx;
      }
    }
  }

  // 商品详情区域
  .detail-section {
    background-color: #fff;
    padding: 24rpx;

    .section-title {
      font-size: 28rpx;
      font-weight: bold;
      color: $jel-font-title;
      margin-bottom: 24rpx;
    }

    .detail-content {
      image {
        width: 100%;
        display: block;
        margin-bottom: 24rpx;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
