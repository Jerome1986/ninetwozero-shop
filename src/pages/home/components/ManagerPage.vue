<script setup lang="ts">
import AmountBar from '@/pages/home/components/AmountBar.vue'
import CustomNav from '@/pages/home/components/CustomNav.vue'
import ManagerHeadBar from '@/pages/home/components/ManagerHeadBar.vue'
import AmountDetail from '@/pages/home/components/AmountDetail.vue'
import StallsList from '@/components/StallsList.vue'
import OrderRecord from '@/components/OrderRecord.vue'
import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
import { useUserStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import { useManagerStore } from '@/stores/modules/manager.ts'
import { makeQrCodeApi } from '@/api/store.ts'
import { ref } from 'vue'
import type { OrderData } from '@/types/ManagerOrder'
import { managerOrderGetApi } from '@/api/order.ts'

// 定义store
const userStore = useUserStore()
const managerStore = useManagerStore()

// 弹窗组件
const popup = ref<InstanceType<typeof UniPopup> | null>(null)

// 进页面检测店长是否绑定门店
onLoad(() => managerStore.checkUserManager(userStore.profile._id))

// 点击生成收款码
const handleQrCode = async () => {
  console.log('父组件code')
  if (managerStore.managerInfo) {
    const res = await makeQrCodeApi(
      managerStore.managerInfo.storeId,
      managerStore.managerInfo.managerId,
    )
  }

  await managerStore.checkUserManager(userStore.profile._id)
}

// 点击保存收款码
const handleSaveCode = () => {
  popup.value.open()
}

// 门店库存订单记录
const orderList = ref<OrderData[]>([])
const orderListGet = async () => {
  if (managerStore.managerInfo?.managerId && managerStore.managerInfo.storeId) {
    const res = await managerOrderGetApi(
      managerStore.managerInfo?.storeId,
      managerStore.managerInfo?.managerId,
    )
    orderList.value = res.data.slice(0, 4)
    console.log('订单', res)
  }
}
onLoad(() => orderListGet())
</script>

<template>
  <view class="managerPage">
    <!--  自定义导航  -->
    <CustomNav></CustomNav>
    <!-- 信息区域 -->
    <scroll-view class="scrollView" :scroll-y="true" :enhanced="true" :show-scrollbar="false">
      <!--  头部店长信息  -->
      <ManagerHeadBar @qrCode="handleQrCode" @saveCode="handleSaveCode"></ManagerHeadBar>
      <!--  内容部分  -->
      <view class="content">
        <!-- 流水 -->
        <AmountBar></AmountBar>
        <!-- 流水明细 -->
        <AmountDetail></AmountDetail>
        <!--  下级摊位数据 -->
        <StallsList></StallsList>
        <!--   库存订单申请记录   -->
        <navigator url="/pages/orderList/orderList" open-type="navigate">
          <OrderRecord :orderList="orderList"></OrderRecord>
        </navigator>
      </view>
    </scroll-view>
    <!--  弹窗  -->
    <uni-popup class="uniPopup" ref="popup" type="center" border-radius="10px 10px 0 0">
      <view class="qrCode">
        <image
          :src="managerStore.managerInfo?.qrCodeUrl"
          mode="widthFix"
          :show-menu-by-longpress="true"
        ></image>
      </view>
      <view class="tips">长按识别保存</view>
    </uni-popup>
  </view>
</template>

<style scoped lang="scss">
.managerPage {
  padding-bottom: 160rpx;
  height: 100%;
  /* 滚动区域 */
  .scrollView {
    flex: 1;
    overflow: hidden;

    /*店长内容区域*/
    .content {
      padding: 0 24rpx 20rpx 24rpx;
      transform: translateY(-96rpx);
      flex: 1;
    }
  }

  .uniPopup {
    text-align: center;
    color: #ffffff;

    .qrCode {
      margin-bottom: 16rpx;
      width: 600rpx;
      height: 600rpx;
      border-radius: 16rpx;
      overflow: hidden;
    }
  }
}
</style>
