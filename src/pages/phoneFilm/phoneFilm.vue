<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import GlobalProductBar from '@/components/GlobalProductBar.vue'
import { ref } from 'vue'
import { productListGetApi } from '@/api/product.ts'
import type { ProductItem } from '@/types/ProductItem'

// 获取传递过来的参数
let typeId = ''
onLoad(async (options?: AnyObject) => {
  console.log(options?.typeId)
  if (options?.typeId) {
    typeId = options?.typeId
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
// 加载中标记，避免并发
const isLoading = ref(false)
// 基础列表数据
const productList = ref<ProductItem[]>([])
const productListGet = async (typeId: string) => {
  if (finish.value) return
  const res = await productListGetApi(page.value.pageNum, page.value.pageSize, typeId)
  console.log(res)

  const list = res?.data?.list || []
  if (list.length > 0) {
    productList.value.push(...list)
  }

  // 判断是否还有下一页（严格按页码判断）
  const totalPages = Number(res?.data?.totalPages) || 1
  if (page.value.pageNum < totalPages) {
    page.value.pageNum++
  } else {
    finish.value = true
  }

  // 额外兜底：如果本次返回不足一页或为空，也视为没有更多
  if (list.length < page.value.pageSize) {
    finish.value = true
  }
}

// 处理触底操作
const handleScrolltolower = async () => {
  if (finish.value || isLoading.value) return
  isLoading.value = true
  try {
    await productListGet(typeId)
  } finally {
    isLoading.value = false
  }
}

/**
 * 处理阅读量的更新
 * @description 接受子组件的列表项点击事件，并获取更新当前项阅读量的参数，同步更新父组件的阅读量
 * @param newLook - 更新后从服务端返回的阅读量
 * @param productId - 点击当前项的id
 */
const handleNewLook = (newLook: number, productId: string) => {
  console.log('更新后的阅读量', newLook, productId)
  const item = productList.value.find((p) => p._id === productId)
  if (item) item.lookNum = newLook
}
</script>

<template>
  <view class="phoneFilm">
    <GlobalProductBar
      :list="productList"
      @update:load-more="handleScrolltolower"
      :finish="finish"
      :cate-type="1"
      @update:lookNum="handleNewLook"
    ></GlobalProductBar>
  </view>
</template>

<style scoped lang="scss">
.phoneFilm {
  height: 100%;
  padding: 24rpx 24rpx 60rpx 24rpx;
}
</style>
