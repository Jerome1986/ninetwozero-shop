import { request } from '@/utils/http.ts'
import type { OrderData } from '@/types/ManagerOrder'
import type { AddResult, UpdateResult } from '@/types/Global'
import type { VipOrderItem } from '@/types/VipOrderItem.ts'

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
 * 根据库存订单同步更新订单流水
 * /store/updateFlow
 */

export const managerOrderUpdateFlowApi = (
  storeId: string,
  description: string,
  type: 'income' | 'expense',
  amount: number,
) => {
  return request<AddResult>({
    method: 'POST',
    url: '/store/updateFlow',
    data: { storeId, description, type, amount },
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
 * @param {string} orderId - 订单id
 */

export const orderDetailGetApi = (orderId: string) => {
  return request<OrderData>({
    method: 'GET',
    url: '/managerOrder/byOrderId',
    data: { orderId },
  })
}

/**
 * 用户获取会员订单
 * /vipOrder/get
 * @param {string} userId - 当前用户id
 * @param {string} status - 当前订单状态
 */

export const userVipOrderGetApi = (userId: string, status: string) => {
  return request<VipOrderItem[]>({
    method: 'GET',
    url: '/vipOrder/get',
    data: { userId, status },
  })
}

/**
 * 用户取消支付时同步当前订单为已取消
 * /vipOrder/update/cancelled
 * @param {string} orderNo - 当前订单号
 */

export const orderCancelledApi = (orderNo: string) => {
  return request<UpdateResult>({
    method: 'POST',
    url: '/vipOrder/update/cancelled',
    data: { orderNo },
  })
}
