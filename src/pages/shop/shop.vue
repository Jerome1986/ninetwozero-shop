<script setup lang="ts">
import NavTab from '@/components/NavTab.vue'
import CategoryBar from '@/components/Category-Bar.vue'
import TypeList from '@/components/TypeList.vue'
import GlobalProductBar from '@/components/GlobalProductBar.vue'

import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BrandModeItem, CateItem, PhoneItem } from '@/types/CateItem'
import { brandListGetApi, cateGetApi, phoneListGetApi } from '@/api/cate.ts'
import type { GiftItem } from '@/types/GiftItem'
import { giftListGetApi } from '@/api/gift.ts'

// 根据类型来展示列表 - typeName 为两种类型 产品展示、礼品展示
const cateType = ref(1)

// 获取页面分类
const cateList = ref<CateItem[]>([])
const cateListGet = async () => {
  const res = await cateGetApi()
  cateList.value = res.data
  cateType.value = cateList.value[0].type
  if (cateList.value.length > 0) {
    await phoneListGet(cateList.value[0]._id)
  }
}

// 根据页面分类获取手机品牌
const phoneList = ref<PhoneItem[]>([])
const phoneListGet = async (parentId: string) => {
  const res = await phoneListGetApi(parentId)
  phoneList.value = res.data
  console.log(res)
  if (phoneList.value.length > 0) {
    await brandModelListGet(phoneList.value[0]._id)
  } else {
    brandModelList.value = []
  }
}

// 根据手机品牌获取手机型号
const brandModelList = ref<BrandModeItem[]>([])
const brandModelListGet = async (parentId: string) => {
  const res = await brandListGetApi(parentId)
  brandModelList.value = res.data
}

// 分页
const page = ref({
  pageNum: 1,
  pageSize: 8,
})

// 已结束标记
const finish = ref(false)
// 获取礼品列表
const giftList = ref<GiftItem[]>([])
const giftListGet = async (parentId: string, pageNum?: number, pageSize?: number) => {
  // 退出分页判断
  if (finish.value) {
    return
  }
  // 发起请求
  const res = await giftListGetApi(parentId, pageNum, pageSize)
  console.log('giftList', res.data, page.value.pageNum, finish.value)
  giftList.value.push(...res.data.list)
  // 如果当前页码小于总页码-当前页码++否则退出分页判断
  if (page.value.pageNum < res.data.totalPages) {
    page.value.pageNum++
  } else {
    finish.value = true
  }
}

// 礼品列表触底事件
const handleScrolltolower = async () => {
  await giftListGet(giftParentId.value, page.value.pageNum, page.value.pageSize)
}

// 处理子组件分类点击事件
const giftParentId = ref('')
const handelCate = async (cateId: string, type: number) => {
  cateType.value = type
  await phoneListGet(cateId)
  if (type === 2) {
    giftParentId.value = cateId
    // 重置分页状态
    page.value.pageNum = 1
    finish.value = false
    giftList.value = []
    await giftListGet(cateId, 1, page.value.pageSize)
  }
}

// 处理手机品牌点击
const handelPhone = async (phoneId: string) => {
  await brandModelListGet(phoneId)
}

// 处理子组件选择手机型号
const handleType = (typeId: string) => {
  console.log('父组件', typeId)
  //  根据型号，跳转到手机膜列表
  uni.navigateTo({
    url: `/pages/phoneFilm/phoneFilm?typeId=${typeId}`,
  })
}

onLoad(async () => {
  await cateListGet()
})
</script>

<template>
  <view class="shop">
    <!--   tab切换   -->
    <NavTab :list="cateList" @cateSelected="handelCate"></NavTab>
    <!--  产品展示  -->
    <view class="list" v-if="cateType === 1">
      <!--  手机品牌分类  -->
      <CategoryBar :list="phoneList" @changePhone="handelPhone"></CategoryBar>
      <!--  手机型号  -->
      <TypeList :list="brandModelList" @selectedType="handleType"></TypeList>
    </view>
    <!--  礼品展示  -->
    <view v-else class="list">
      <GlobalProductBar
        :list="giftList"
        @scrolltolower="handleScrolltolower"
        :finish="finish"
        :cate-type="2"
      ></GlobalProductBar>
    </view>
  </view>
</template>

<style lang="scss">
.shop {
  height: 100%;
  padding: 24rpx;
  display: flex;
  flex-direction: column;

  .list {
    flex: 1;
    overflow: hidden;
  }
}
</style>
