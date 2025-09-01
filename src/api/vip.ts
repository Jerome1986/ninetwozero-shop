import { request } from '@/utils/http.ts'
import type { VipItem, VipRenderInfo } from '@/types/VipItem'

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

/**
 * 查询下一会员等级
 * /vip/level
 * @param {number} vipLevel - 当前会员等级
 */

export const nextVipLevelApi = (vipLevel: number) => {
  return request<VipRenderInfo>({
    method: 'GET',
    url: '/vip/level',
    data: { vipLevel },
  })
}
