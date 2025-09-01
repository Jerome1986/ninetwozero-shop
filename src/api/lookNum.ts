import { request } from '@/utils/http.ts'
import type { LookNumItem } from '@/types/LookNum.ts'

/**
 * 自动更新阅读量
 * /lookNum/update
 * @param {string} productId - 当前产品的id
 * @param {string} cateType - 当前更新所属的类型(产品列表、礼品列表)
 */

export const autoLookNumApi = (productId: string, cateType: number) => {
  return request<LookNumItem>({
    method: 'POST',
    url: '/lookNum/update',
    data: { productId, cateType },
  })
}
