<script setup lang="ts">
import NavTitle from '@/components/NavTitle.vue'
import { ref } from 'vue'

// 优惠券列表
const couponList = ref([])
</script>

<template>
  <view class="earnings">
    <!-- 优惠券组件   -->
    <view class="coupon">
      <view class="item" v-if="couponList.length">
        <!-- title -->
        <NavTitle title="我的优惠券" :is-more="false"></NavTitle>
        <!-- todo优惠券内容区域 -->
      </view>
      <view class="noMore" v-else>
        <image class="pic" src="/static/images/nocoupon.png" mode="heightFix"></image>
        <text>您还没有优惠券哟~</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.earnings {
  padding: 24rpx;
  /*头部区域*/
  /*优惠券*/
  .coupon {
    margin-top: 24rpx;

    .noMore {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16rpx;
      margin-top: 300rpx;
      height: 200rpx;
      color: $jel-font-dec;
      font-size: 28rpx;
    }
  }
}
</style>
