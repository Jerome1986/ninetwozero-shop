import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StoreItem } from '@/types/StoreItem.d..ts'
import { storeInfoGetApi } from '@/api/store.ts'

// 定义 Store
export const useManagerStore = defineStore(
  'manager',
  () => {
    const managerInfo = ref<StoreItem>()

    // 检测当前店长是否绑定门店
    const checkUserManager = async (userId: string) => {
      const res = await storeInfoGetApi(userId)
      console.log('绑定的门店信息', res)
      managerInfo.value = res.data
    }

    // 记得 return
    return {
      managerInfo,
      checkUserManager,
    }
  },
  {
    // 网页端配置
    // persist: true,
    // 小程序端配置
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
