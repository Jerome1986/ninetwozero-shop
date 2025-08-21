<script setup lang="ts"></script>

<template name="skeleton">
  <view class="sk-container">
    <view
      is="components/Banner"
      class="data-v-0cd09a48 data-v-0cd09a48"
      style="scroll-snap-align: none"
    >
      <view class="banner Banner--banner data-v-3587acbb Banner--data-v-3587acbb">
        <swiper
          :autoplay="false"
          :circular="true"
          class="data-v-3587acbb Banner--data-v-3587acbb"
          :current="0"
        >
          <swiper-item
            class="bannerItem Banner--bannerItem data-v-3587acbb Banner--data-v-3587acbb"
            style="
              position: absolute;
              width: 100%;
              height: 100%;
              transform: translate(0%, 0px) translateZ(0px);
            "
          >
            <image
              class="bannerImg Banner--bannerImg data-v-3587acbb Banner--data-v-3587acbb sk-image"
              :lazy-load="true"
              mode="aspectFill"
            ></image>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view is="components/ProductList" class="data-v-0cd09a48 data-v-0cd09a48">
      <view is="components/NavTitle" class="data-v-32d040e6 ProductList--data-v-32d040e6">
        <view class="title NavTitle--title data-v-adfdf508 NavTitle--data-v-adfdf508">
          <view class="left NavTitle--left data-v-adfdf508 NavTitle--data-v-adfdf508">
            <view
              class="icon NavTitle--icon data-v-adfdf508 NavTitle--data-v-adfdf508 sk-image"
            ></view>
            <view
              class="text NavTitle--text data-v-adfdf508 NavTitle--data-v-adfdf508 sk-transparent sk-text-14-2857-913 sk-text"
            >
              产品信息
            </view>
          </view>
          <view class="right NavTitle--right data-v-adfdf508 NavTitle--data-v-adfdf508">
            <text
              class="data-v-adfdf508 NavTitle--data-v-adfdf508 sk-transparent sk-text-14-2857-97 sk-text"
              >更多
            </text>
            <text
              class="iconfont NavTitle--iconfont icon-bianzu NavTitle--icon-bianzu data-v-adfdf508 NavTitle--data-v-adfdf508 sk-pseudo sk-pseudo-circle"
              style="font-size: 10px; margin-left: 4px"
            ></text>
          </view>
        </view>
      </view>
      <view class="preview ProductList--preview data-v-32d040e6 ProductList--data-v-32d040e6">
        <view class="column ProductList--column data-v-32d040e6 ProductList--data-v-32d040e6">
          <view class="item ProductList--item data-v-32d040e6 ProductList--data-v-32d040e6">
            <image
              class="coverImg ProductList--coverImg data-v-32d040e6 ProductList--data-v-32d040e6 sk-image"
              mode="widthFix"
              style="height: 171.5px"
            ></image>
          </view>
          <view class="item ProductList--item data-v-32d040e6 ProductList--data-v-32d040e6">
            <image
              class="coverImg ProductList--coverImg data-v-32d040e6 ProductList--data-v-32d040e6 sk-image"
              mode="widthFix"
              style="height: 171.5px"
            ></image>
          </view>
        </view>
        <view class="column ProductList--column data-v-32d040e6 ProductList--data-v-32d040e6">
          <view class="item ProductList--item data-v-32d040e6 ProductList--data-v-32d040e6">
            <image
              class="coverImg ProductList--coverImg data-v-32d040e6 ProductList--data-v-32d040e6 sk-image"
              mode="widthFix"
              style="height: 171.5px"
            ></image>
          </view>
          <view class="item ProductList--item data-v-32d040e6 ProductList--data-v-32d040e6">
            <image
              class="coverImg ProductList--coverImg data-v-32d040e6 ProductList--data-v-32d040e6 sk-image"
              mode="widthFix"
              style="height: 171.5px"
            ></image>
          </view>
        </view>
      </view>
    </view>
    <view is="components/TeamStyle" class="data-v-0cd09a48 data-v-0cd09a48">
      <view is="components/NavTitle" class="data-v-207a81d6 TeamStyle--data-v-207a81d6">
        <view class="title NavTitle--title data-v-adfdf508 NavTitle--data-v-adfdf508">
          <view class="left NavTitle--left data-v-adfdf508 NavTitle--data-v-adfdf508">
            <view
              class="icon NavTitle--icon data-v-adfdf508 NavTitle--data-v-adfdf508 sk-image"
            ></view>
            <view
              class="text NavTitle--text data-v-adfdf508 NavTitle--data-v-adfdf508 sk-transparent sk-text-14-2857-142 sk-text"
            >
              团队风采
            </view>
          </view>
          <view class="right NavTitle--right data-v-adfdf508 NavTitle--data-v-adfdf508">
            <text
              class="data-v-adfdf508 NavTitle--data-v-adfdf508 sk-transparent sk-text-14-2857-924 sk-text"
            >
              更多
            </text>
            <text
              class="iconfont NavTitle--iconfont icon-bianzu NavTitle--icon-bianzu data-v-adfdf508 NavTitle--data-v-adfdf508 sk-pseudo sk-pseudo-circle"
              style="font-size: 10px; margin-left: 4px"
            ></text>
          </view>
        </view>
      </view>
      <view class="item-list TeamStyle--item-list data-v-207a81d6 TeamStyle--data-v-207a81d6">
        <image
          class="cover TeamStyle--cover data-v-207a81d6 TeamStyle--data-v-207a81d6 sk-image"
          mode="aspectFill"
        ></image>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.sk-transparent {
  color: transparent !important;
}

.sk-text-14-2857-969 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text-14-2857-913 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}

.sk-text-14-2857-97 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}

.sk-text-14-2857-142 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}

.sk-text-14-2857-924 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}

.sk-image {
  background: #efefef !important;
}

.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}

.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}

.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}

.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
