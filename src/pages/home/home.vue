<script setup lang="ts">
import CustomNav from '@/pages/home/components/CustomNav.vue'
import Banner from '@/components/Banner.vue'
import ProductList from '@/components/ProductList.vue'

import { ref } from 'vue'
import type { ProductItem } from '@/types/ProductItem.d.ts'
import { productListGetApi } from '@/api/product.ts'
import { onLoad } from '@dcloudio/uni-app'
import TeamStyle from '@/components/TeamStyle.vue'
import type { TeamItem } from '@/types/Team'
import { teamStudyListGetApi } from '@/api/team.ts'

// 产品列表
const productList = ref<ProductItem[]>([])
const productListGet = async () => {
  const res = await productListGetApi()
  productList.value = res.data.list.slice(0, 4)
}

// 团队培训课程列表
const teamList = ref<TeamItem[]>([])
const teamListGet = async () => {
  const res = await teamStudyListGetApi()
  teamList.value = res.data.list
}

// 获取数据后调用
onLoad(async () => {
  await Promise.all([productListGet(), teamListGet()])
})
</script>

<template>
  <view class="homePages">
    <!--  自定义导航  -->
    <CustomNav></CustomNav>
    <scroll-view class="scrollView" :scroll-y="true">
      <!-- banner   -->
      <Banner></Banner>
      <!--  产品预览区域  -->
      <ProductList :list="productList"></ProductList>
      <!--   员工风采   -->
      <TeamStyle :list="teamList"></TeamStyle>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.homePages {
  padding-bottom: 160rpx;
  height: 100%;

  /* 滚动区域 */
  .scrollView {
    padding: 24rpx;
    flex: 1;
    overflow: hidden;
  }
}
</style>
