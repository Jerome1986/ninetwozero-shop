<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import GlobalProductBar from '@/components/GlobalProductBar.vue'
import { ref } from 'vue'
import { productListGetApi } from '@/api/product.ts'
import type { ProductItem } from '@/types/ProductItem'

// 获取传递过来的参数
onLoad(async (options?: AnyObject) => {
  console.log(options?.typeId)
  if (options?.typeId) {
    await productListGet(options?.typeId)
  }
})

// 分页
const page = ref({
  pageNum: 1,
  pageSize: 8,
})
// 退出分页标记
const finish = ref(false)
// 基础列表数据
const productList = ref<ProductItem[]>([])
const productListGet = async (typeId: string) => {
  // 退出分页判断
  if (finish.value) {
    return
  }
  // 发起请求
  const res = await productListGetApi(page.value.pageNum, page.value.pageSize, typeId)
  console.log(res)
  productList.value.push(...res.data.list)
  // 如果当前页码小于总页码-当前页码++否则退出分页判断
  if (page.value.pageNum < res.data.totalPages || res.data.totalPages > 1) {
    page.value.pageNum++
  } else {
    finish.value = true
  }
}

// 处理触底操作
const handleScrolltolower = () => {
  console.log('触底了')
}
</script>

<template>
  <view class="phoneFilm">
    <GlobalProductBar
      :list="productList"
      @scrolltolower="handleScrolltolower"
      :finish="finish"
      :cate-type="1"
    ></GlobalProductBar>
  </view>
</template>

<style scoped lang="scss">
.phoneFilm {
  height: 100%;
  padding: 24rpx;
}
</style>
