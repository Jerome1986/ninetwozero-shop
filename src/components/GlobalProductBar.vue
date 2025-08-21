<script setup lang="ts">
import type { GiftItem } from '@/types/GiftItem'
import type { ProductItem } from '@/types/ProductItem'
import { ref, watch } from 'vue'

// 使用联合类型
type ListItem = GiftItem | ProductItem

const props = defineProps<{
  list: ListItem[]
  finish: boolean
  cateType?: number | string // 可选，默认 undefined
}>()

// 左右两列数据
const leftList = ref<ListItem[]>([])
const rightList = ref<ListItem[]>([])

// 监听列表变化，分配数据到左右两列
watch(
  () => props.list,
  (newList) => {
    // 获取新增的数据
    const currentTotal = leftList.value.length + rightList.value.length
    const newItems = newList.slice(currentTotal)

    // 将新数据分配到较短的一列
    newItems.forEach((item) => {
      if (leftList.value.length <= rightList.value.length) {
        leftList.value.push(item)
      } else {
        rightList.value.push(item)
      }
    })
  },
  { deep: true },
)

// 点击跳转详情
const handleItemDetail = (productId: string) => {
  console.log(productId)
  uni.navigateTo({
    url: `/pages/productDetail/productDetail?productId=${productId}&cateType=${props.cateType}`,
  })
}
</script>

<template>
  <scroll-view
    :enhanced="true"
    :show-scrollbar="false"
    :scroll-y="true"
    class="scroll-container"
    @scrolltolower="$emit('scrolltolower')"
  >
    <view class="product-list">
      <!-- 左列 -->
      <view class="column">
        <view
          class="item"
          v-for="item in leftList"
          :key="item._id"
          @click="handleItemDetail(item._id)"
        >
          <image class="cover" :src="item.cover" mode="widthFix"></image>
          <view class="title">{{ item.name }}</view>
          <view class="desc">{{ item.dec }}</view>
          <view class="footer">
            <view class="price">{{ item.currentPrice }}</view>
            <view class="views">
              <text class="iconfont icon-zongliulanliang"></text>
              <text>{{ 'lookView' in item ? item.lookView : item.lookNum }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 右列 -->
      <view class="column">
        <view
          class="item"
          v-for="item in rightList"
          :key="item._id"
          @click="handleItemDetail(item._id)"
        >
          <image class="cover" :src="item.cover" mode="widthFix"></image>
          <view class="title">{{ item.name }}</view>
          <view class="desc">{{ item.dec }}</view>
          <view class="footer">
            <view class="price">{{ item.currentPrice }}</view>
            <view class="views">
              <text class="iconfont icon-zongliulanliang"></text>
              <text>{{ 'lookView' in item ? item.lookView : item.lookNum }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--   触底提示   -->
    <view class="tips" v-if="!finish">加载更多</view>
    <view class="tips" v-else>没有更多数据~</view>
  </scroll-view>
</template>

<style scoped lang="scss">
/* 滚动容器 - 设置基础高度和盒模型 */
.scroll-container {
  height: 100%; // 占满父容器高度
  box-sizing: border-box; // 边框和内边距计入总高度
}

/* 商品列表 - 两列布局容器 */
.product-list {
  display: flex; // 开启弹性布局，使子元素水平排列
  gap: 16rpx; // 列间距

  /* 单列容器 - 左右两列的基础样式 */
  .column {
    flex: 1; // 均分容器宽度
    display: flex; // 开启弹性布局
    flex-direction: column; // 列内元素垂直排列
    gap: 16rpx; // 商品项之间的间距
  }

  /* 商品项 - 单个商品卡片样式 */
  .item {
    width: 100%; // 占满列宽
    background-color: #fff; // 白色背景
    border-radius: 8rpx; // 圆角边框
    overflow: hidden; // 超出部分隐藏
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05); // 轻微阴影效果

    /* 商品封面图 */
    .cover {
      width: 100%; // 图片宽度占满容器
      display: block; // 块级元素，避免图片下方空隙
      border-radius: 8rpx 8rpx 0 0; // 上方圆角
    }

    /* 商品标题 */
    .title {
      font-size: 28rpx; // 标题字号
      font-weight: 600; // 加粗
      color: $jel-font-title; // 标题颜色
      padding: 16rpx; // 内边距
      line-height: 1.4; // 行高
      @include ellipsis(2); // 超出两行显示省略号
    }

    /* 商品描述 */
    .desc {
      padding: 0 16rpx; // 左右内边距
      font-size: 24rpx; // 描述文字大小
      color: $jel-font-dec2; // 描述文字颜色
      @include ellipsis(1); // 超出一行显示省略号
    }

    /* 底部信息栏 */
    .footer {
      padding: 16rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      /* 价格 */
      .price {
        font-weight: bold;
        color: $jel-brandColor;
        line-height: 1;

        &::before {
          content: '￥';
          font-size: 28rpx;
        }
      }

      /* 浏览量 */
      .views {
        display: flex;
        align-items: flex-end;
        gap: 4rpx;
        font-size: 24rpx;
        color: $jel-font-dec;

        .iconfont {
          font-size: 28rpx;
          line-height: 1;
        }

        text {
          line-height: 1;
        }
      }
    }
  }
}

/* 加载见底提示 */
.tips {
  margin-top: 24rpx; // 上方间距
  text-align: center; // 文字居中
  color: $jel-font-dec; // 次要文字颜色
  font-size: 24rpx; // 文字大小
}
</style>
