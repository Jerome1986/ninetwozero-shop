import { request } from '@/utils/http.ts'
import type { PageResult } from '@/types/Global'
import type { ProductItem } from '@/types/ProductItem'

/**
 * 获取产品列表
 * /product/get
 * @param {number} pagesNum - 页码
 * @param {number} pagesSize - 每页条数
 */

export const productListGetApi = (pagesNum?: number, pagesSize?: number) => {
  return request<PageResult<ProductItem[]>>({
    method: 'GET',
    url: '/product/get',
    data: { pagesNum, pagesSize },
  })
}
