import { request } from '@/utils/http.ts'
import type { VipItem } from '@/types/VipItem'

/**
 * 获取vip产品列表
 * /vip/get
 */
export const vipGetApi = () => {
  return request<VipItem[]>({
    method: 'GET',
    url: '/vip/get',
  })
}
