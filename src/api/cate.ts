import { request } from '@/utils/http.ts'
import type { BrandModeItem, CateItem, PhoneItem } from '@/types/CateItem.ts'

/**
 * 获取所有一级分类
 * /cate/get
 */

export const cateGetApi = () => {
  return request<CateItem[]>({
    method: 'GET',
    url: '/cate/get',
  })
}

/**
 * 获取手机品牌
 * /cate/phone/get
 * @param {string} parent_id - 所属品牌的id
 */

export const phoneListGetApi = (parent_id: string) => {
  return request<PhoneItem[]>({
    method: 'GET',
    url: '/cate/phone/get',
    data: { parent_id },
  })
}

/**
 * 根据手机品牌id获取手机型号列表
 * /cate/brandmodel/get
 */

export const brandListGetApi = (parent_id: string) => {
  return request<BrandModeItem[]>({
    method: 'GET',
    url: '/cate/brandmodel/get',
    data: { parent_id },
  })
}
