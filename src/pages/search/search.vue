<script lang="ts" setup>
import SearchBar from '@/components/SearchBar.vue'
import type { ProductItem } from '@/types/ProductItem'
import { ref } from 'vue'
import { productSearchApi } from '@/api/product'

// 分页
const paramas = ref({
  pageNum: 1,
  pageSize: 100,
})
// 产品数据
const products = ref<ProductItem[]>([])
const getProducts = async (val: string) => {
  const res = await productSearchApi(val, paramas.value.pageNum, paramas.value.pageSize)
  console.log(res)

  products.value = res.data.list || []
}

// 处理搜索事件
const handleSearch = (val: string) => {
  console.log('搜索', val)
  getProducts(val)
}

// 处理清除事件
const handleClear = () => {
  console.log('清除')
  products.value = []
  paramas.value.pageNum = 1
}

// 跳转详情
const handleNavigate = (id: string) => {
  uni.navigateTo({
    url: `/pages/productDetail/productDetail?productId=${id}&cateType=1`,
  })
}
</script>

<template>
  <view class="searchPage">
    <!-- 搜索组件 -->
    <SearchBar @search="handleSearch" @clear="handleClear"></SearchBar>

    <!-- 结果列表（每行1个） -->
    <view class="result-list">
      <view
        class="product-card"
        v-for="item in products"
        :key="item._id"
        @click="handleNavigate(item._id)"
      >
        <image class="cover" :src="item.cover" mode="widthFix"></image>
        <view class="info">
          <view class="name">{{ item.name }}</view>
          <view class="desc">{{ item.dec }}</view>
          <view class="price-row">
            <view class="current">¥{{ item.currentPrice.toFixed(2) }}</view>
            <view class="original">¥{{ item.originalPrice.toFixed(2) }}</view>
          </view>
          <view class="meta">
            <text class="iconfont icon-zongliulanliang"></text>
            <text class="views">{{ item.lookNum }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.searchPage {
  padding: 24rpx 24rpx 60rpx 24rpx;
  width: 100%;
  height: 100%;
  background-color: $jel-pageBackGroundColor;
  overflow-y: auto;
}

/* 列表容器 */
.result-list {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

/* 单个卡片（每行1个） */
.product-card {
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.cover {
  width: 100%;
  height: 360rpx;
  display: block;
}

.info {
  padding: 16rpx;
}

.name {
  font-size: 30rpx;
  color: $jel-font-title;
  font-weight: 600;
  @include ellipsis(2);
}

.desc {
  margin-top: 6rpx;
  font-size: 24rpx;
  color: $jel-font-dec2;
  @include ellipsis(2);
}

.price-row {
  margin-top: 10rpx;
  display: flex;
  align-items: baseline;
  gap: 12rpx;

  .current {
    color: $jel-brandColor;
    font-size: 32rpx;
    font-weight: 700;
  }
  .original {
    font-size: 24rpx;
    color: $jel-font-dec;
    text-decoration: line-through;
  }
}

.meta {
  margin-top: 8rpx;
  display: flex;
  align-items: center;
  gap: 6rpx;
  color: $jel-font-dec;
  font-size: 22rpx;

  .iconfont {
    font-size: 22rpx;
  }
}
</style>
