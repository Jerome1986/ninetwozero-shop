import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ActivityItem } from '@/types/ActivityItem'
import { activityGetApi } from '@/api/activity.ts'

// 定义 Store
export const useActivityStore = defineStore('activity', () => {
  const activityList = ref<ActivityItem[]>([])

  const activityListGet = async () => {
    const res = await activityGetApi()
    activityList.value = res.data
  }
  // 记得 return
  return {
    activityList,
    activityListGet,
  }
})
