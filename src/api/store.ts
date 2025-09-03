import { request } from '@/utils/http.ts'
import type { StoreItem } from '@/types/StoreItem.d..ts'
import type { QrCode } from '@/types/Global'

/**
 * 根据用户id获取对应门店信息--店长时有效
 * /store/byId
 * @param {string} userId - 当前用户id
 */

export const storeInfoGetApi = (userId: string) => {
  return request<StoreItem>({
    method: 'GET',
    url: '/store/byId',
    data: { userId },
  })
}

/**
 * 生成门店收款码
 * /qrCode/add
 * @param {string} storeId - 当前绑定的门店id
 * @param {string} managerId - 当前的用户id
 */

export const makeQrCodeApi = (storeId: string, managerId: string) => {
  return request<QrCode>({
    method: 'POST',
    url: '/qrCode/add',
    data: { storeId, managerId },
  })
}
