import { defineStore } from 'pinia'
import { ref } from 'vue'
import { commissionGetApi } from '@/api/store.ts'

// 定义 Store
export const useCommissionStore = defineStore(
  'commission',
  () => {
    // 一级佣金比例
    const level1Rate = ref(0)
    // 二级佣金比例
    const level2Rate = ref(0)
    // 平台佣金比例
    const platformRate = ref(0)

    // 获取平台佣金规则
    const commissionRoleGet = async () => {
      const res = await commissionGetApi()
      console.log('规则', res)
      level1Rate.value = res.data.level1Rate
      level2Rate.value = res.data.level2Rate
      platformRate.value = res.data.platformRate
    }
    // 记得 return
    return {
      level1Rate,
      level2Rate,
      platformRate,
      commissionRoleGet,
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
