import { request } from '@/utils/http.ts'
import type { PageResult } from '@/types/Global'
import type { GiftItem } from '@/types/GiftItem'

/**
 * 获取礼品列表
 * /gift/get
 * @param {string} parent_id - 所属分类的id
 * @param {number} pagesNum - 当前页
 * @param {number} pagesSize - 每页条数
 */

export const giftListGetApi = (parent_id: string, pagesNum?: number, pagesSize?: number) => {
  return request<PageResult<GiftItem[]>>({
    method: 'GET',
    url: '/gift/get',
    data: { parent_id, pagesNum, pagesSize },
  })
}
