<script setup lang="ts">
import NavTitle from '@/components/NavTitle.vue'
</script>

<template>
  <view class="stallsList">
    <!-- title -->
    <NavTitle title="摊位数据"></NavTitle>
    <!--  摊位列表  -->
    <scroll-view class="list" :scroll-x="true" :enhanced="true" :show-scrollbar="false">
      <view class="item" v-for="item in 8" :key="item">
        <view class="avatar">
          <image src="/static/images/testAvatar.jpg" mode="aspectFit"></image>
        </view>
        <view class="name">街道口</view>
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
