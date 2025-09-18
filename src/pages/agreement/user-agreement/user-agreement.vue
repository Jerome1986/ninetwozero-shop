<script setup lang="ts">
// 如果需要返回按钮逻辑，可以在这里添加
</script>
<template>
  <view class="container">
    <!-- 头部标题与更新信息 -->
    <view class="header">
      <view class="title">用户协议</view>
      <view class="meta">
        <text class="meta-item">更新日期：2025-09-12</text>
        <text class="dot">·</text>
      </view>
    </view>

    <scroll-view :scroll-y="true" class="content" :enhanced="true" :show-scrollbar="false">
      <!-- 导读提示 -->
      <view class="notice">
        为了更好地保障您的权益，请在使用本平台服务前，认真阅读并充分理解本协议的全部内容。
      </view>

      <!-- 目录（仅展示） -->
      <view class="toc">
        <view class="toc-title">目录</view>
        <view class="toc-list">
          <text class="toc-item">1. 用户注册与账户</text>
          <text class="toc-item">2. 用户行为规范</text>
          <text class="toc-item">3. 平台权利与义务</text>
          <text class="toc-item">4. 免责声明</text>
          <text class="toc-item">5. 隐私与数据保护</text>
          <text class="toc-item">6. 知识产权声明</text>
          <text class="toc-item">7. 协议变更与终止</text>
          <text class="toc-item">8. 联系我们</text>
        </view>
      </view>

      <!-- 分节内容（卡片化） -->
      <view class="section-card">
        <view class="section-title">1. 用户注册与账户</view>
        <view class="p">1) 用户需提供真实、准确、完整的信息进行注册，并及时维护信息有效性。</view>
        <view class="p">2) 用户应妥善保管账户及密码，因保管不善导致的损失由用户自行承担。</view>
        <view class="p"
          >3) 平台有权依据法律法规及平台规则，对异常或违规账户采取限制或封禁措施。</view
        >
      </view>

      <view class="section-card">
        <view class="section-title">2. 用户行为规范</view>
        <view class="p">1) 不得发布违法、违规、侵权或不良信息，不得侵犯他人合法权益。</view>
        <view class="p">2) 不得对平台实施恶意攻击、逆向破解、爬取或其他干扰行为。</view>
        <view class="p">3) 应遵守平台社区规范、交易规则及其他相关管理规定。</view>
      </view>

      <view class="section-card">
        <view class="section-title">3. 平台权利与义务</view>
        <view class="p">1) 平台有权依据法律法规和本协议管理用户行为并进行内容审核。</view>
        <view class="p">2) 平台将尽力保障服务稳定运行，但不保证服务绝对无中断或无错误。</view>
        <view class="p">3) 对用户上传内容享有必要的管理权，但不对全部内容承担法律责任。</view>
      </view>

      <view class="section-card">
        <view class="section-title">4. 免责声明</view>
        <view class="p"
          >1) 因不可抗力、第三方原因或设备故障导致的服务中断、数据丢失，平台不承担责任。</view
        >
        <view class="p">2) 用户因使用本平台服务造成的任何直接或间接损失，由用户自行承担。</view>
      </view>

      <view class="section-card">
        <view class="section-title">5. 隐私与数据保护</view>
        <view class="p">1) 平台将依照相关法律法规保护用户个人信息安全，不会超范围收集与使用。</view>
        <view class="p">2) 详细内容请参阅《隐私政策》，包括信息收集、使用、存储与分享规则。</view>
      </view>

      <view class="section-card">
        <view class="section-title">6. 知识产权声明</view>
        <view class="p"
          >1) 平台展示的商标、LOGO、界面、文字与图像等，受法律保护，未经授权不得使用。</view
        >
        <view class="p">2) 用户在平台发布的内容，授权平台在合法范围内以合理方式使用与传播。</view>
      </view>

      <view class="section-card">
        <view class="section-title">7. 协议变更与终止</view>
        <view class="p"
          >1) 平台有权根据业务调整或法规变化对本协议进行修订，并以合理方式进行公示。</view
        >
        <view class="p"
          >2) 用户可在不同意新版协议时，停止使用并申请注销账户；继续使用视为同意。</view
        >
      </view>

      <view class="section-card">
        <view class="section-title">8. 联系我们</view>
        <view class="p">如对本协议有任何疑问或建议，可通过平台在线客服与我们联系。</view>
      </view>

      <view class="footer-tip">阅读至此，即表示您已充分理解并同意本协议的全部条款。</view>

      <view class="bottom-space"></view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 24rpx;
  padding-bottom: 8rpx;
  background-color: #ffffff;

  .title {
    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
  }

  .meta {
    margin-top: 8rpx;
    display: flex;
    align-items: center;
    color: #999999;
    font-size: 24rpx;

    .meta-item {
      white-space: nowrap;
    }
    .dot {
      margin: 0 8rpx;
    }
  }
}

.content {
  flex: 1;
  padding: 0 24rpx 24rpx 24rpx;
}

.notice {
  margin: 12rpx 0 16rpx 0;
  padding: 16rpx;
  background-color: #fff6f6;
  color: #d62731;
  border: 1rpx solid #ffe1e3;
  border-radius: 12rpx;
  font-size: 24rpx;
}

.toc {
  background-color: #ffffff;
  border-radius: 12rpx;
  border: 1rpx solid #f2f2f2;
  padding: 16rpx;
  margin-bottom: 16rpx;

  .toc-title {
    font-size: 26rpx;
    color: #666666;
    margin-bottom: 8rpx;
    font-weight: 600;
  }
  .toc-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8rpx 16rpx;
  }
  .toc-item {
    font-size: 24rpx;
    color: #888888;
  }
}

.section-card {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
  border: 1rpx solid #f5f5f5;

  .section-title {
    position: relative;
    padding-left: 16rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #333333;
    margin-bottom: 12rpx;
  }
  .section-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6rpx;
    width: 8rpx;
    height: 28rpx;
    border-radius: 4rpx;
    background-color: #d62731; /* 品牌色 */
  }

  .p {
    font-size: 26rpx;
    line-height: 40rpx;
    color: #333333;
    margin-bottom: 8rpx;
  }
}

.footer-tip {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #999999;
  text-align: center;
}

.bottom-space {
  height: 80rpx;
}
</style>
