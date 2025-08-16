<script setup lang="ts"></script>

<template>
  <view class="banner">
    <swiper :circular="true" :autoplay="true">
      <swiper-item class="bannerItem">
        <image
          src="https://objectstorageapi.gzg.sealos.run/dxepxlzz-sealaf-h91gpva7y7-cloud-bin/banner1.jpg"
          mode="aspectFill"
          :lazy-load="true"
        ></image>
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
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
