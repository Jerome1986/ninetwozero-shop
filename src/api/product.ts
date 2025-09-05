import { request } from '@/utils/http.ts'
import type { PageResult } from '@/types/Global'
import type { ProductItem } from '@/types/ProductItem'

/**
 * 获取产品列表
 * /product/get
 * @param {number} pagesNum - 页码
 * @param {number} pagesSize - 每页条数
 * @param {string} modelId - 所属分类id，可选,不传就代表请求所有
 */

export const productListGetApi = (pagesNum?: number, pagesSize?: number, modelId?: string) => {
  return request<PageResult<ProductItem[]>>({
    method: 'GET',
    url: '/product/get',
    data: { pagesNum, pagesSize, modelId },
  })
}

/**
 * 根据产品id获取产品
 * /product/byId
 */

export const productByIdGetApi = (productId: string, cateType: number = 1) => {
  return request<ProductItem>({
    method: 'GET',
    url: '/product/byId',
    data: { productId, cateType },
  })
}
