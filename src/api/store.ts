import { request } from '@/utils/http.ts'
import type { StoreItem } from '@/types/StoreItem.d..ts'
import type { inviterStoreItem, QrCode } from '@/types/Global'
import type { StoreFlowTotal, StoreOrderFlow } from '@/types/Flow'

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

/**
 * 获取当前用户下级门店
 * /business/get
 * @param {string} storeId - 当前用户绑定的门店id
 */

export const businessListApi = (storeId: string) => {
  return request<inviterStoreItem>({
    method: 'GET',
    url: '/business/get',
    data: { storeId },
  })
}

/**
 * 根据门店id获取当前门店流水
 * /store/getFlow
 * @param {string} storeId - 当前门店id
 */

export const getStoreFlowApi = (storeId: string) => {
  return request<StoreOrderFlow[]>({
    method: 'GET',
    url: '/store/getFlow',
    data: { storeId },
  })
}

/**
 * 获取昨日、今日、本周的流水合计
 * /store/totalFlow
 */

export const getStoreFlowTotalApi = (storeId: string) => {
  return request<StoreFlowTotal>({
    method: 'GET',
    url: '/store/totalFlow',
    data: { storeId },
  })
}
