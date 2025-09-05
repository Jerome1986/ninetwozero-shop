import { request } from '@/utils/http.ts'
import type { OrderData } from '@/types/ManagerOrder'
import type { AddResult } from '@/types/Global'

/**
 * 店长提交库存订单
 * /managerOrder/add
 * @param {OrderData} orderData - 提交的订单信息
 */

export const managerOrderAddApi = (orderData: OrderData) => {
  return request<AddResult>({
    method: 'POST',
    url: '/managerOrder/add',
    data: { orderData },
  })
}

/**
 * 根据门店id和店长id获取库存申请订单
 * /managerOrder/byId
 */

export const managerOrderGetApi = (storeId: string, managerId: string) => {
  return request<OrderData[]>({
    method: 'GET',
    url: '/managerOrder/byId',
    data: { storeId, managerId },
  })
}
