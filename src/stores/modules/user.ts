import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserItem } from '@/types/UserItem'

// 定义 Store
export const useUserStore = defineStore(
  'user',
  () => {
    // 用户默认数据
    const DEFAULT_INFO = ref<UserItem>({
      nickname: '',
      _id: '',
      avatarUrl: '',
      mobile: '',
      gender: 1,
      role: 'user',
      registerTime: '',
      status: '',
    })

    // 会员信息
    const profile = ref<UserItem>({ ...DEFAULT_INFO.value })
    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = { ...profile.value, ...val }
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = DEFAULT_INFO.value
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
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
