import { request } from '@/utils/http.ts'
import type { ActivityItem } from '@/types/ActivityItem'

/**
 * 获取所有的活动列表
 * /activity/get
 */

export const activityGetApi = () => {
  return request<ActivityItem[]>({
    method: 'GET',
    url: '/activity/get',
  })
}
