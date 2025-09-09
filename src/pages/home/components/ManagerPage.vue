<script setup lang="ts">
import AmountBar from '@/pages/home/components/AmountBar.vue'
import CustomNav from '@/pages/home/components/CustomNav.vue'
import ManagerHeadBar from '@/pages/home/components/ManagerHeadBar.vue'
import AmountDetail from '@/pages/home/components/AmountDetail.vue'
import StallsList from '@/components/StallsList.vue'
import OrderRecord from '@/components/OrderRecord.vue'
import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
import { useUserStore } from '@/stores'
import { useManagerStore } from '@/stores/modules/manager.ts'
import {
  businessListApi,
  getStoreFlowApi,
  getStoreFlowTotalApi,
  makeQrCodeApi,
} from '@/api/store.ts'
import { onMounted, ref } from 'vue'
import type { OrderData } from '@/types/ManagerOrder'
import { managerOrderGetApi } from '@/api/order.ts'
import type { StoreItem } from '@/types/StoreItem.d..ts'
import type { StoreOrderFlow } from '@/types/Flow'
import type { flowTotal } from '@/types/Global'

// 定义store
const userStore = useUserStore()
const managerStore = useManagerStore()

// 弹窗组件
const popup = ref<InstanceType<typeof UniPopup> | null>(null)

// 点击生成收款码
const handleQrCode = () => {
  console.log('父组件code')
  uni.showModal({
    title: '提示',
    content: '点击确定生成你的门店收款码',
    confirmColor: '#d62731',
    success: async (modalRes) => {
      if (managerStore.managerInfo && modalRes.confirm) {
        try {
          const qrRes = await makeQrCodeApi(
            managerStore.managerInfo.storeId,
            managerStore.managerInfo.managerId,
          )
          console.log('收款码返回', qrRes)
          await uni.showToast({ title: '生成成功', icon: 'success', mask: true })
          await managerStore.checkUserManager(userStore.profile._id)
        } catch (err) {
          console.error('生成收款码失败', err)
          await uni.showToast({ title: '生成失败，请重试', icon: 'none' })
        }
      }
    },
  })
}

// 点击保存收款码
const handleSaveCode = () => {
  popup.value.open()
}

// 门店库存订单记录
const orderList = ref<OrderData[]>([])
const orderListGet = async (storeId: string, managerId: string) => {
  const res = await managerOrderGetApi(storeId, managerId)
  orderList.value = res.data.slice(0, 4)
  console.log('订单', res)
}

// 获取下级门店列表
const businessList = ref<StoreItem[]>([])
const businessListGet = async (storeId: string) => {
  const res = await businessListApi(storeId)
  // 将一级和二级合并显示
  businessList.value = [...res.data.firstStore, ...res.data.subStore]
}

// 获取当前门店昨日、今日、本周合计流水
const flowTotalList = ref<flowTotal[]>([])
const storeFlowTotalGet = async (storeId: string) => {
  const res = await getStoreFlowTotalApi(storeId)
  console.log('合计流水', res)
  flowTotalList.value = [
    { id: '1', amount: res.data.yesterdayTotal, text: '昨日' },
    { id: '2', amount: res.data.todayTotal, text: '今日' },
    { id: '3', amount: res.data.weekTotal, text: '本周' },
  ]
}

// 获取当前门店流水
const flowList = ref<StoreOrderFlow[]>([])
const storeFlowGet = async (storeId: string) => {
  const res = await getStoreFlowApi(storeId)
  // 首页展示，只取前4条
  flowList.value = res.data.slice(0, 4)
  console.log('流水', res)
}

// 等待页面加载完毕--检测店长是否绑定门店
onMounted(async () => {
  let isManager
  if (userStore.profile._id) {
    isManager = await managerStore.checkUserManager(userStore.profile._id)
  }
  // 如果返回true 说明为店长则获取对应的门店信息
  if (isManager && managerStore.managerInfo) {
    await Promise.all([
      // 当前门店合计流水
      storeFlowTotalGet(managerStore.managerInfo.storeId),
      // 获取当前门店流水
      storeFlowGet(managerStore.managerInfo.storeId),
      // 下级摊位列表
      businessListGet(managerStore.managerInfo.storeId),
      // 当前门店库存订单
      orderListGet(managerStore.managerInfo.storeId, managerStore.managerInfo.managerId),
    ])
  }
})
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
        <!-- 流水合计 -->
        <AmountBar :flowTotalList="flowTotalList"></AmountBar>
        <!-- 流水明细 -->
        <AmountDetail :flowList="flowList"></AmountDetail>
        <!--  下级摊位数据 -->
        <StallsList :businessList="businessList"></StallsList>
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
