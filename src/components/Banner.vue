<script setup lang="ts">
import type { ActivityItem } from '@/types/ActivityItem'

defineProps({
  list: Array as () => ActivityItem[],
})
</script>

<template>
  <view class="banner">
    <swiper :circular="true" :autoplay="true">
      <swiper-item class="bannerItem" v-for="item in list" :key="item._id">
        <image class="bannerImg" :src="item.cover" mode="scaleToFill" :lazy-load="true"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<style scoped lang="scss">
/* banner区域 */
.banner {
  margin-bottom: 24rpx;
  width: 100%;

  swiper {
    border-radius: 16rpx;
    height: 304rpx;

    .bannerItem {
      .bannerImg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
