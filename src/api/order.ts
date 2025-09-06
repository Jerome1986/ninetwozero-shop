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
 * @param {string} storeId - 门店id
 * @param {string} managerId - 店长id
 * @param {string} orderState - 订单状态
 */

export const managerOrderGetApi = (storeId: string, managerId: string, orderState: string = '') => {
  return request<OrderData[]>({
    method: 'GET',
    url: '/managerOrder/byId',
    data: { storeId, managerId, orderState },
  })
}

/**
 * 根据订单id获取订单详情
 * /managerOrder/byOrderId
 */

export const orderDetailGetApi = (orderId: string) => {
  return request<OrderData>({
    method: 'GET',
    url: '/managerOrder/byOrderId',
    data: { orderId },
  })
}
