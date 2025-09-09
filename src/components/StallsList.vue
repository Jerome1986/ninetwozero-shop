<script setup lang="ts">
import NavTitle from '@/components/NavTitle.vue'
import type { StoreItem } from '@/types/StoreItem.d..ts'

defineProps<{
  businessList: StoreItem[]
}>()

// 处理跳转
const handleNav = () => {
  uni.navigateTo({
    url: '/pages/businessList/businessList',
  })
}
</script>

<template>
  <view class="stallsList" @click="handleNav">
    <!-- title -->
    <NavTitle title="摊位数据"></NavTitle>
    <!--  摊位列表  -->
    <scroll-view class="list" :scroll-x="true" :enhanced="true" :show-scrollbar="false">
      <view class="item" v-for="item in businessList" :key="item._id">
        <view class="avatar">
          <image :src="item.storeLogo" mode="aspectFit"></image>
        </view>
        <view class="name">{{ item.name }}</view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.stallsList {
  padding: 24rpx;
  margin-top: 24rpx;
  background-color: #ffffff;
  border-radius: 8rpx;

  .list {
    white-space: nowrap; /* 横向滚动的关键 */
    width: 100%;
    overflow: hidden; /* 防止超出 */

    .item {
      text-align: center;
      margin-right: 48rpx;
      display: inline-block; /* 横向排列 */
      width: fit-content;

      &:nth-last-child(1) {
        margin-right: 0;
      }

      .avatar {
        margin-bottom: 12rpx;

        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          overflow: hidden;
        }
      }

      .name {
        color: $jel-font-title;
        font-size: 24rpx;
      }
    }
  }
}
</style>
