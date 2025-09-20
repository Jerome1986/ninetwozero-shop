<script setup lang="ts">
import { ref } from 'vue'
import type { ProductItem, SkuItem } from '@/types/ProductItem'
import { productByIdGetApi } from '@/api/product.ts'
import { onLoad } from '@dcloudio/uni-app'
import FooterBar from '@/pages/productDetail/components/FooterBar.vue'
import { useCartStore, useUserStore } from '@/stores'

const popup = ref<any>()

// 定义store
const cartStore = useCartStore()
const userStore = useUserStore()

// 获取产品列表
const productData = ref<ProductItem>()
const productDataGet = async (productId: string, cateType: number) => {
  const res = await productByIdGetApi(productId, cateType)
  console.log(res)
  productData.value = res.data
  activeSkuCover.value = res.data.cover
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

// 处理sku的选择
const activeSkuIndex = ref<number | null>(null) // 当前选择的sku索引
const activeSkuCover = ref('') // 当前选择的sku图片
const activeSkuPrice = ref(0) // 当前选择的sku价格
const activeSkuName = ref('默认规格') // 当前选择的sku名称
const selectSku = ref<SkuItem>() // 当前选择的sku对象
const handleSelectSku = (item: SkuItem, index: number) => {
  console.log('选择了sku', item, index)
  activeSkuIndex.value = index
  activeSkuCover.value = item.cover
  activeSkuPrice.value = item.price
  activeSkuName.value = item.name
  // 去掉后端返回的文件上传属性
  delete item.skuFileList
  selectSku.value = item
}

//  处理sku的确认
const handleSkuConfrim = () => {
  if (!selectSku.value) {
    return uni.showToast({
      icon: 'error',
      title: '请选择规格',
    })
  }

  console.log('确认了sku', selectSku.value)
  popup.value?.close()
}

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

  // 如果没有选择sku，提示选择
  if (selectSku.value === undefined) {
    isAdding.value = false
    return uni.showToast({
      icon: 'error',
      title: '请选择规格',
      mask: true,
    })
  }

  try {
    const cartItem = {
      id: productData.value._id,
      selected: true,
      imageUrl: productData.value.cover,
      name: productData.value.name,
      description: productData.value.dec,
      unitPrice: productData.value.currentPrice,
      quantity: 1,
      selectSku: selectSku.value!, // 当前选择的sku
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
          <view
            style="display: flex; align-items: center"
            v-if="userStore.profile.role === 'manager' && cateType === '1'"
          >
            <view class="price">
              <text class="symbol">￥</text>
              <text class="number">{{ productData?.currentPrice.toFixed(2) }}</text>
            </view>
            <view class="original-price"> ￥{{ productData?.originalPrice.toFixed(2) }}</view>
          </view>
          <view v-else style="color: #d62731">非卖品</view>
        </view>
        <view class="views">
          <text class="iconfont icon-zongliulanliang"></text>
          <text>{{ productData?.lookNum }}</text>
        </view>
      </view>
      <view class="title">{{ productData?.skuNo }} {{ productData?.name }}</view>
      <view class="desc">{{ productData?.dec }}</view>
    </view>

    <!-- 选择规格 -->
    <view class="spec-section" @click="popup?.open()">
      <view class="section-title">选择规格</view>
      <view class="spec-content">
        <text>{{ selectSku?.name || '已选：默认规格' }}</text>
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

    <!--  sku弹窗 样式  -->
    <uni-popup class="uniPopup" ref="popup" type="bottom" background-color="#fff">
      <view class="skuList">
        <!-- 图片价格区域 -->
        <view class="skuView">
          <view class="skuCover">
            <image :src="activeSkuCover" mode="aspectFill" />
          </view>
          <view class="skuInfo">
            <!-- 标题 描述 -->
            <view class="proName">{{ productData?.name }}</view>
            <view class="proDec">{{ productData?.dec }}</view>
            <view class="skuName">{{ activeSkuName }}</view>
            <!-- 价格 -->
            <view class="skuPrice">
              <text class="skuPrice--text">¥</text>
              <text class="skuPrice--text">{{ activeSkuPrice.toFixed(2) }}</text>
            </view>
          </view>
        </view>
        <!-- SKU选择区域 -->
        <view class="title">规格</view>
        <view class="skuContent">
          <view
            class="skuItem"
            :class="{ activeSku: index === activeSkuIndex }"
            v-for="(item, index) in productData?.skuList"
            :key="index"
            @click="handleSelectSku(item, index)"
          >
            {{ item.name }}
          </view>
        </view>
        <!-- 选好了 -->
        <view class="confrim" @click="handleSkuConfrim">确定</view>
      </view>
    </uni-popup>
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

  // 弹窗
  .uniPopup {
    .skuList {
      position: relative;
      padding: 24rpx;
      height: 60vh;

      .skuView {
        display: flex;
        align-items: center;
        gap: 24rpx;
        margin-bottom: 24rpx;
        // sku图片
        .skuCover {
          width: 200rpx;
          height: 200rpx;
          border-radius: 8rpx;
          overflow: hidden;
        }

        // sku信息
        .skuInfo {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 200rpx;
          // 标题
          .proName {
            font-size: 36rpx;
            color: $jel-font-title;
            @include ellipsis(2);
          }
          // 描述
          .proDec {
            font-size: 28rpx;
            color: $jel-font-dec;
            @include ellipsis(1);
          }
          // 规格
          .skuName {
            font-size: 28rpx;
            color: $jel-font-dec2;
          }

          // 价格
          .skuPrice {
            display: flex;
            align-items: baseline;
            margin-top: 12rpx;

            &--text {
              font-size: 32rpx;
              font-weight: bold;
              color: $jel-brandColor;

              &:first-child {
                font-size: 24rpx;
                margin-right: 4rpx;
              }
            }
          }
        }
      }
      // 规格
      .title {
        font-weight: bold;
        color: $jel-font-title;
        margin-bottom: 16rpx;
      }
      .skuContent {
        display: flex;
        flex-wrap: wrap;
        gap: 24rpx;
        // SKU每一项
        .skuItem {
          padding: 8rpx 16rpx;
          width: fit-content;
          font-size: 28rpx;
          color: $jel-font-title;
          background-color: #f5f5f5;
          border-radius: 8rpx;
        }
        // SKU每一项-选中状态
        .activeSku {
          color: $jel-brandColor;
          font-size: 28rpx;
          border: 1rpx solid $jel-brandColor;
          background-color: rgba(255, 242, 237);
        }
      }
    }
    // 确定按钮
    .confrim {
      position: absolute;
      bottom: 24rpx;
      left: 24rpx;
      right: 24rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background-color: $jel-brandColor;
      color: #fff;
      font-size: 32rpx;
      border-radius: 100rpx;
    }
  }
}
</style>
