// 申请人信息
import type { ShoppingCart } from '@/types/Cart'

/**
 * 联系人信息
 */
export type Applicant = {
  /** 下单人姓名 */
  name?: string
  /** 下单人所归属门店 */
  shop?: string
  /** 下单人电话 */
  mobile?: string
}

// 订单数据
export type OrderData = {
  /** 订单列表id */
  _id?: string
  /** 订单编号 */
  outTradeNo?: string
  /** 门店id */
  storeId?: string
  /** 店长id */
  managerId?: string
  /**  已选择的商品 */
  product: ShoppingCart
  /**  总价或总数，看你的业务逻辑 */
  total: number
  /**  订单联系人信息 */
  applicant: Applicant
  /** 订单状态  -- 备货中  待取货  已完成  已取消  */
  state?: '备货中' | '待取货' | '已完成' | '已取消'
  /** 下单时间 */
  creatAt?: Date
}
