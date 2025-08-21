<script setup lang="ts">
// 这里不用写逻辑，只提供结构 + 样式
</script>

<template>
  <view class="search-bar">
    <view class="search-box">
      <text class="iconfont icon-sousuo"></text>
      <input
        class="search-input"
        type="text"
        placeholder="搜索商品、品牌"
        placeholder-class="placeholder"
      />
    </view>
    <view class="search-btn">搜索</view>
  </view>
</template>

<style scoped lang="scss">
.search-bar {
  display: flex;
  align-items: center;
  padding: 16rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  border-bottom: 1rpx solid #f5f5f5;

  .search-box {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
    border-radius: 50rpx;
    padding: 0 20rpx;
    height: 72rpx;
    border: 2rpx solid #d62731;

    .icon {
      font-size: 28rpx;
      margin-right: 12rpx;
      color: #d62731;
    }

    .search-input {
      flex: 1;
      font-size: 28rpx;
      color: #333;
    }

    .placeholder {
      color: #999;
      font-size: 28rpx;
    }
  }

  .search-btn {
    margin-left: 20rpx;
    padding: 0 32rpx;
    height: 72rpx;
    line-height: 72rpx;
    background-color: #d62731;
    color: #fff;
    font-size: 28rpx;
    border-radius: 50rpx;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
