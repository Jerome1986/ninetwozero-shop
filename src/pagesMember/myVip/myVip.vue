<script setup lang="ts">
import { useUserStore } from '@/stores'
import { maskMiddle } from '@/utils/maskMiddle.ts'
import { ref } from 'vue'
import { vipGetApi } from '@/api/vip.ts'
import type { VipItem } from '@/types/VipItem'
import { onLoad } from '@dcloudio/uni-app'
import { formatRole } from '@/utils/formatTimestamp.ts'
import { wxPayApi } from '@/api/wx.ts'
import { userInfoGetApi } from '@/api/users.ts'
import { orderCancelledApi } from '@/api/order.ts'
import { generateOrderNo } from '@/utils/randomOrderNo.ts'

// 获取系统参数计算安全距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 定义 store
const userStore = useUserStore()

// 默认下标
const activeIndex = ref(0)

// vip列表
const vipList = ref<VipItem[]>([])

// 获取vip列表
const vipListGet = async () => {
  const res = await vipGetApi()
  vipList.value = res.data
  currentVip.value = vipList.value[activeIndex.value]
}
onLoad(() => vipListGet())

// 当前支付的价格--暂时为所选择的价格，后期可根据积分、优惠券抵扣计算
const currentPrice = (price?: number) => {
  return price || vipList.value[activeIndex.value]?.price
}
// 当前所选择的产品
const currentVip = ref<VipItem>()
// 处理选择
const handleSelected = (item: VipItem, index: number) => {
  currentPrice(item.price)
  activeIndex.value = index
  currentVip.value = item
}

// 点击立即购买
const buyNow = async () => {
  console.log('buyNow', currentVip.value)
  // 随机生成订单号--用于前端查询
  const orderNo = generateOrderNo('user')
  // 1.向后端发起支付请求
  if (currentVip.value?._id) {
    const payRes = await wxPayApi(
      orderNo,
      userStore.profile._id,
      currentVip.value._id,
      currentVip.value.level,
      currentVip.value.levelText,
      currentVip.value.discount,
      currentVip.value.gift,
      currentVip.value.term,
      currentPrice(),
      '办理会员',
    )
    console.log(payRes)
    // 2.通过后端返回参数、发起前端微信支付
    wx.requestPayment({
      timeStamp: payRes.data.timeStamp,
      nonceStr: payRes.data.nonceStr,
      package: payRes.data.packageValue,
      signType: payRes.data.signType,
      paySign: payRes.data.paySign,
      async success(res) {
        // 3.支付成功后-重新获取更新的数据（实际的更新动作由后端完成）
        const userRes = await userInfoGetApi(userStore.profile._id)
        console.log('支付成功', res)
        const { openid, ...newData } = userRes.data
        userStore.setProfile(newData)
        // 支付成功提示+跳转
        setTimeout(() => {
          uni.showToast({ icon: 'success', title: '支付成功' })
          uni.switchTab({ url: '/pages/my/my' })
        }, 800)
      },
      async fail(err) {
        // 直接更新订单为已取消
        console.error('支付失败', err)
        const res = await orderCancelledApi(orderNo)
        console.log('取消支付结果', res)
        await uni.showToast({
          icon: 'none',
          title: '取消支付',
        })
      },
    })
  }
}
</script>

<template>
  <view class="myVip">
    <!-- 头部 -->
    <view class="head">开通会员，畅享VIP服务特权</view>
    <!-- 用户信息 -->
    <view class="userInfo">
      <view class="avatar">
        <image :src="userStore.profile.avatarUrl" mode="aspectFit"></image>
      </view>
      <view class="mobile">{{ maskMiddle(userStore.profile.mobile) }}</view>
      <!-- 当前用户的身份 -->
      <view class="role"
        >({{ formatRole(userStore.profile.role, userStore.profile.vipLevel) }})
      </view>
    </view>
    <!-- 会员权益 -->
    <scroll-view class="vip" :scroll-x="true" :enhanced="true" :show-scrollbar="false">
      <view
        class="item"
        :class="{ itemActive: activeIndex === index }"
        v-for="(item, index) in vipList"
        :key="item._id"
        @click="handleSelected(item, index)"
      >
        <view class="head">{{ item.levelText }}</view>
        <view class="content">
          <view class="discount">{{ item.discount }}折</view>
          <view class="price">
            <text style="font-size: 28rpx">￥</text>
            <text>{{ item.price.toFixed(1) }}</text>
          </view>
        </view>
        <view class="foot">赠送贴膜{{ item.gift }}次</view>
      </view>
    </scroll-view>
    <!-- 微信支付 -->
    <view class="pay">
      <view class="left">
        <text class="iconfont icon-weixinzhifu" style="font-size: 28rpx; color: #27b20b"></text>
        <view class="text" style="font-size: 28rpx; color: #333333">微信支付</view>
      </view>
      <radio color="#d52731" style="transform: scale(0.7)" value="微信支付" :checked="true" />
    </view>
    <!-- 底部购买按钮 -->
    <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      <view class="buyPrice">
        <text style="color: #333333">支付金额：</text>
        <text>￥</text>
        <text style="font-size: 32rpx">{{ currentPrice() }}</text>
      </view>
      <view class="buyBtn" @click="buyNow">立即购买</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.myVip {
  padding: 24rpx;

  .head {
    margin-bottom: 12rpx;
    font-size: 36rpx;
    color: $jel-brandColor;
    font-family: 'YouSheBiaoTiHei', 'Microsoft YaHei', sans-serif;
  }

  /*用户信息*/
  .userInfo {
    margin-bottom: 24rpx;
    display: flex;
    align-items: center;
    gap: 10rpx;
    color: $jel-font-title;

    .avatar {
      image {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .role {
      font-size: 24rpx;
      color: $jel-font-dec;
    }
  }

  /*vip*/
  .vip {
    white-space: nowrap; /* 关键：让子元素不换行 */

    .item {
      margin-right: 40rpx;
      display: inline-block; /* 关键：横向排列 */
      position: relative;
      width: 240rpx;
      height: 240rpx;
      border-radius: 16rpx;
      background-color: #ffffff;

      &:nth-last-child(1) {
        margin-right: 0;
      }

      /*头部*/
      .head {
        padding: 2rpx 16rpx;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #e8e8e8;
        color: $jel-font-title;
        font-size: 24rpx;
        border-radius: 16rpx 0 16rpx 0;
      }

      /*中间价格内容*/
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .discount {
          margin-bottom: 8rpx;
          color: $jel-font-dec;
        }

        .price {
          display: flex;
          align-items: center;
          font-size: 40rpx;
          color: $jel-brandColor;
        }
      }

      /*底部*/
      .foot {
        text-align: center;
        padding: 4rpx 0;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #fcf3c9;
        color: $jel-font-title;
        font-size: 24rpx;
        border-radius: 0 0 16rpx 16rpx;
      }
    }

    /*激活样式*/
    .itemActive {
      border: 1px solid $jel-brandColor;
      background: linear-gradient(134.1deg, rgba(252, 246, 196, 1) 0%, rgba(255, 231, 232, 1) 100%);

      .head {
        color: #ffffff;
        background-color: $jel-brandColor;
      }

      .content {
        .discount {
          color: $jel-font-title;
        }
      }

      .foot {
        color: #ffffff;
        background-color: $jel-brandColor;
      }
    }
  }

  /*微信支付*/
  .pay {
    padding: 24rpx;
    margin-top: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8rpx;
    color: $jel-font-title;

    .left {
      display: flex;
      align-items: center;
      gap: 16rpx;
    }
  }

  /*底部按钮*/
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: #fff;
    height: 100rpx;
    padding: 0 20rpx var(--window-bottom);
    border-top: 1rpx solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: content-box;

    .buyPrice {
      color: $jel-brandColor;
      font-size: 28rpx;
    }

    .buyBtn {
      text-align: center;
      padding: 18rpx 0;
      width: 284rpx;
      background-color: $jel-brandColor;
      color: #fff;
      border-radius: 40rpx;
      font-size: 28rpx;
    }
  }
}
</style>
