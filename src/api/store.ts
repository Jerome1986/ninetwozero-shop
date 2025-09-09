import { request } from '@/utils/http.ts'
import type { StoreItem } from '@/types/StoreItem.d..ts'
import type { CheckStoreParentResult, inviterStoreItem, QrCode, UpdateResult } from '@/types/Global'
import type { filterFlow, StoreFlowTotal, StoreOrderFlow } from '@/types/Flow'
import type { CommissionRule } from '@/types/CommissionRule'

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
 * @param {string} storeId - 当前门店id
 */

export const getStoreFlowTotalApi = (storeId: string) => {
  return request<StoreFlowTotal>({
    method: 'GET',
    url: '/store/totalFlow',
    data: { storeId },
  })
}

/**
 * 根据指定日期筛选门店流水
 * /store/RangeType
 */

export const filterFlowApi = (
  storeId: string,
  range: string,
  year: number = 0,
  month: number = 0,
) => {
  return request<filterFlow>({
    method: 'GET',
    url: '/store/RangeType',
    data: { storeId, range, year, month },
  })
}

/**
 * 获取佣金比例
 * /commission/get
 */

export const commissionGetApi = () => {
  return request<CommissionRule>({
    method: 'GET',
    url: '/commission/get',
  })
}

/**
 * 查询该门店是否有上级-用于佣金计算
 * /store/checkParent
 * @param {string} storeId - 当前门店id
 */

export const checkParentStoreApi = (storeId: string) => {
  return request<CheckStoreParentResult>({
    method: 'POST',
    url: '/store/checkParent',
    data: { storeId },
  })
}

/**
 * 更新当前门店头像
 * /store/updateLogo
 */

export const updateStoreLogoApi = (url: string, storeId: string) => {
  return request<UpdateResult>({
    method: 'POST',
    url: '/store/updateLogo',
    data: { url, storeId },
  })
}
