<script setup lang="ts">
// 如需返回逻辑可在此补充
</script>
<template>
  <view class="container">
    <!-- 头部标题与更新信息 -->
    <view class="header">
      <view class="title">隐私政策</view>
      <view class="meta">
        <text class="meta-item">更新日期：2025-09-12</text>
        <text class="dot">·</text>
      </view>
    </view>

    <scroll-view :scroll-y="true" class="content" :enhanced="true" :show-scrollbar="false">
      <!-- 导读提示（合规说明） -->
      <view class="notice">
        本隐私政策适用于微信小程序环境。我们将严格遵守《微信小程序平台运营规范》《个人信息保护法》等法律法规，
        并仅在实现业务必要的前提下收集、使用您的个人信息。
      </view>

      <!-- 目录 -->
      <view class="toc">
        <view class="toc-title">目录</view>
        <view class="toc-list">
          <text class="toc-item">1. 我们收集的信息</text>
          <text class="toc-item">2. 我们如何使用信息</text>
          <text class="toc-item">3. 共享、转让与公开披露</text>
          <text class="toc-item">4. 信息存储与安全</text>
          <text class="toc-item">5. 您的权利（访问、更正、删除、撤回授权）</text>
          <text class="toc-item">6. 设备权限与敏感信息说明</text>
          <text class="toc-item">7. 第三方SDK与统计服务</text>
          <text class="toc-item">8. 未成年人保护</text>
          <text class="toc-item">9. 本政策的变更</text>
          <text class="toc-item">10. 联系我们</text>
        </view>
      </view>

      <!-- 1. 我们收集的信息 -->
      <view class="section-card">
        <view class="section-title">1. 我们收集的信息</view>
        <view class="p"
          >1) 账号信息：用于注册/登录的昵称、头像、手机号（如使用手机快捷登录）、VIP等级等。</view
        >
        <view class="p"
          >2) 订单信息：下单记录、支付金额、支付状态、订单号（不保存银行卡号等敏感支付要素）。</view
        >
        <view class="p"
          >3) 设备与日志：设备型号、系统版本、网络类型、操作日志（用于故障定位与性能优化）。</view
        >
        <view class="p"
          >4) 必要定位/相册/相机权限：仅在您主动触发相应功能（如扫码、上传凭证）时请求并使用。</view
        >
      </view>

      <!-- 2. 我们如何使用信息 -->
      <view class="section-card">
        <view class="section-title">2. 我们如何使用信息</view>
        <view class="p">1) 业务功能：完成会员购买、订单管理、库存记录、数据展示等核心服务。</view>
        <view class="p"
          >2) 客服与通知：用于订单进度提醒、售后服务与风险通知（仅在必要范围内触达）。</view
        >
        <view class="p"
          >3) 安全保障：用于身份验证、反欺诈、故障排查与统计分析，提升产品稳定性与安全性。</view
        >
      </view>

      <!-- 3. 共享、转让与公开披露 -->
      <view class="section-card">
        <view class="section-title">3. 共享、转让与公开披露</view>
        <view class="p"
          >1) 共享：仅在业务必要或法律要求下，与支付机构/物流/合规主体进行必要的数据共享。</view
        >
        <view class="p"
          >2) 转让：如发生合并、分立等变更，我们将要求受让方继续受本政策约束，并征得您的同意。</view
        >
        <view class="p"
          >3)
          公开披露：原则上不公开披露您的个人信息，确需披露时将征得您的明示同意或符合法律规定。</view
        >
      </view>

      <!-- 4. 信息存储与安全 -->
      <view class="section-card">
        <view class="section-title">4. 信息存储与安全</view>
        <view class="p">1) 存储地点：您的个人信息将存储在依法合规的境内服务器。</view>
        <view class="p"
          >2) 存储期限：为实现目的所必需的最短期限，超过期限后删除或做匿名化处理。</view
        >
        <view class="p"
          >3) 安全措施：我们采用访问控制、加密传输等手段保障信息安全，尽力防止数据泄露与滥用。</view
        >
      </view>

      <!-- 5. 您的权利 -->
      <view class="section-card">
        <view class="section-title">5. 您的权利（访问、更正、删除、撤回授权）</view>
        <view class="p">1) 访问：您可在「我的」中查看账户与订单信息。</view>
        <view class="p"
          >2) 更正与删除：如信息存在错误或您希望删除，可通过在线客服或相关入口发起申请。</view
        >
        <view class="p"
          >3)
          撤回授权：您可在系统设置或弹窗授权页撤回权限（相机、相册、定位等），撤回后可能影响相关功能。</view
        >
      </view>

      <!-- 6. 设备权限与敏感信息说明 -->
      <view class="section-card">
        <view class="section-title">6. 设备权限与敏感信息说明</view>
        <view class="p">1) 相机/扫码：用于扫码支付码、二维码识别等场景；未使用时不获取。</view>
        <view class="p">2) 相册：用于上传头像、订单凭证等；未使用时不获取。</view>
        <view class="p">3) 位置：仅在需要定位附近门店/服务时使用；未使用时不获取。</view>
      </view>

      <!-- 7. 第三方SDK与统计服务 -->
      <view class="section-card">
        <view class="section-title">7. 第三方SDK与统计服务</view>
        <view class="p"
          >如我们接入第三方
          SDK/统计分析服务，将在本节披露其名称、用途、收集信息类型与官方网站链接。</view
        >
        <view class="p">当前版本未接入除微信支付所需的微信官方能力以外的第三方采集类 SDK。</view>
      </view>

      <!-- 8. 未成年人保护 -->
      <view class="section-card">
        <view class="section-title">8. 未成年人保护</view>
        <view class="p"
          >如您为未成年人，请在监护人同意与指导下使用本小程序，并在必要时由监护人行使相关权利。</view
        >
      </view>

      <!-- 9. 本政策的变更 -->
      <view class="section-card">
        <view class="section-title">9. 本政策的变更</view>
        <view class="p"
          >我们可能适时更新本政策；如涉及重大变更，将通过页面公告或弹窗方式提示您。</view
        >
      </view>

      <!-- 10. 联系我们 -->
      <view class="section-card">
        <view class="section-title">10. 联系我们</view>
        <view class="p"
          >如对本政策有疑问、建议或投诉，您可通过小程序内「在线客服」与我们联系。</view
        >
      </view>

      <view class="footer-tip">继续使用即表示您已充分阅读、理解并同意本《隐私政策》;</view>
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
