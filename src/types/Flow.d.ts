/**
 * 门店流水记录类型
 */
export type StoreOrderFlow = {
  /** MongoDB 主键ID */
  _id: string
  /** 门店ID */
  storeId: string
  /** 商户订单号，对应门店订单 */
  outTradeNo: string
  /** 微信支付交易号 */
  transactionId: string
  /** 收支类型：income = 收入, expense = 支出 */
  type: 'income' | 'expense'
  /** 金额，单位分，正数表示金额大小，方向由 type 决定 */
  amount: number
  /** 本次账单说明：贴膜等 */
  description: string
  /** 流水创建时间 */
  createdAt: Date
}

/**
 * 获取昨日、今日、本周的流水返回类型
 */

export type StoreFlowTotal = {
  todayTotal: number
  yesterdayTotal: number
  weekTotal: number
}
