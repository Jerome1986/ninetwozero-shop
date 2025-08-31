import { request } from '@/utils/http.ts'
import type { cooperateItem, HireItem } from '@/types/Apply'

/**
 * 查询申请-员工招聘/合作申请
 * /apply/get
 */
export const applyGetApi = (userId: string, applyType: string) => {
  if (applyType === 'hire') {
    return request<HireItem>({
      method: 'GET',
      url: '/apply/get',
      data: { userId, applyType },
    })
  }

  if (applyType === 'cooperate') {
    return request<cooperateItem>({
      method: 'GET',
      url: '/apply/get',
      data: { userId, applyType },
    })
  }
}
