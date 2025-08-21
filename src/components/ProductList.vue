<script setup lang="ts">
import { computed } from 'vue'
import type { ProductItem } from '@/types/ProductItem'
import NavTitle from '@/components/NavTitle.vue'

// 接收父组件传入的商品列表
const props = defineProps({
  list: {
    type: Array as () => ProductItem[],
    default: () => [],
  },
})

// 使用计算属性处理瀑布流
const leftList = computed(() => {
  return props.list.filter((_, index) => index % 2 === 0)
})

const rightList = computed(() => {
  return props.list.filter((_, index) => index % 2 === 1)
})

// 处理点击跳转
const handleItem = (productId: string) => {
  uni.navigateTo({
    url: `/pages/productDetail/productDetail?productId=${productId}&cateType=1`,
  })
}
</script>

<template>
  <!--   title   -->
  <NavTitle title="产品信息"></NavTitle>
  <!-- 列表 -->
  <view class="preview">
    <!-- 左列 -->
    <view class="column">
      <view class="item" v-for="item in leftList" :key="item._id" @click="handleItem(item._id)">
        <image class="coverImg" :src="item.cover" mode="widthFix"></image>
      </view>
    </view>

    <!-- 右列 -->
    <view class="column">
      <view class="item" v-for="item in rightList" :key="item._id" @click="handleItem(item._id)">
        <image class="coverImg" :src="item.cover" mode="widthFix"></image>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.preview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24rpx;

  .column {
    width: calc(50% - 8rpx);

    .item {
      margin-bottom: 16rpx;

      .coverImg {
        width: 100%;
        display: block;
        border-radius: 16rpx;
      }
    }
  }
}
</style>
