import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserItem } from '@/types/UserItem'

// 定义 Store
export const useUserStore = defineStore(
  'user',
  () => {
    // 用户默认数据
    const DEFAULT_INFO = ref<UserItem>({
      _id: '',
      inviterCode: '',
      referralCode: '',
      nickname: '',
      avatarUrl:
        'https://objectstorageapi.gzg.sealos.run/dxepxlzz-sealaf-h91gpva7y7-cloud-bin/test-product/defaultAvatar.png',
      mobile: '点击登录',
      gender: 1,
      role: 'user',
      registerTime: '',
      status: '',
      vipLevel: 0, // 1:基础会员, 2:高级会员, 3:至尊会员
      vipStartTime: '', // 会员注册时间
      vipEndTime: '', // 会员到期时间
      vipGift: 0,
      vipDiscount: 0,
      inviterCodeUrl: '',
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
