<script setup lang="ts">
import CustomNav from '@/pages/home/components/CustomNav.vue'
import Banner from '@/components/Banner.vue'
import ProductList from '@/components/ProductList.vue'
import PageSkeleton from '@/pages/home/components/PageSkeleton.vue'
import TeamStyle from '@/components/TeamStyle.vue'

import { ref } from 'vue'
import type { ProductItem } from '@/types/ProductItem.d.ts'
import { productListGetApi } from '@/api/product.ts'
import { onLoad } from '@dcloudio/uni-app'
import type { TeamItem } from '@/types/Team'
import { teamStudyListGetApi } from '@/api/team.ts'
import { useActivityStore } from '@/stores/modules/activity.ts'

// 活动列表
const activityStore = useActivityStore()

// 产品列表
const productList = ref<ProductItem[]>([])
const productListGet = async () => {
  const res = await productListGetApi(1, 8, '')
  console.log('首页', res)
  productList.value = res.data.list.slice(0, 4)
}

// 团队培训课程列表
const teamList = ref<TeamItem[]>([])
const teamListGet = async () => {
  const res = await teamStudyListGetApi()
  teamList.value = res.data.list
}

// 骨架屏加载开关
const isLoading = ref(false)
// 获取数据后调用
onLoad(async () => {
  isLoading.value = true
  await Promise.all([activityStore.activityListGet(), productListGet(), teamListGet()])
  isLoading.value = false
})
</script>

<template>
  <view class="userPages">
    <!--  自定义导航  -->
    <CustomNav></CustomNav>
    <scroll-view class="scrollView" :scroll-y="true" :enhanced="true" :show-scrollbar="false">
      <PageSkeleton v-if="isLoading"></PageSkeleton>
      <template v-else>
        <!-- banner   -->
        <Banner :list="activityStore.activityList"></Banner>
        <!--  产品预览区域  -->
        <ProductList :list="productList"></ProductList>
        <!--   员工风采   -->
        <TeamStyle :list="teamList"></TeamStyle>
      </template>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.userPages {
  padding-bottom: 160rpx;
  height: 100%;

  /* 滚动区域 */
  .scrollView {
    flex: 1;
    padding: 24rpx;
    overflow: hidden;
  }
}
</style>
