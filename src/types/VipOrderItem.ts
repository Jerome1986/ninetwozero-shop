/**
 * vip订单数据类型
 */

export type VipOrderItem = {
  /** vip订单数据库id-唯一标识*/
  _id: string
  /** 订单唯一标识（可用后端生成，格式可自定义，如 WX + 时间戳 + 随机数）*/
  out_trade_no: string
  /** 用户唯一标识（购买该会员的用户） */
  userId: string
  /** 购买的会员等级 ID，对应 VipItem._id */
  vipId: string
  /** 会员等级 */
  vipLevel: number
  /** 购买的会员等级名称，用于前端展示 */
  vipLevelText: string
  /** 支付金额（单位：元，等于 VipItem.price） */
  amount: number
  /** 会员折扣（取自 VipItem.discount） */
  discount: number
  /** 赠送的贴膜次数（取自 VipItem.gift） */
  giftCount: number
  /** 会员有效期（取自 VipItem.term，用于说明会员期限） */
  term: string
  /** 会员有效期（支付成功后-会员的到期时间） */
  expirationTime?: string
  /** 订单状态 */
  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'REFUNDED'
  /** 微信支付返回的 prepay_id，用于前端调起支付 */
  prepayId?: string
  /** 微信支付交易号，支付成功后回填 */
  transactionId?: string
  /** 支付时间（ISO 8601 格式），支付成功后回填 */
  paidAt?: string
  /** 创建订单时间（ISO 8601 格式） */
  createdAt: string
  /** 更新时间（ISO 8601 格式，用于记录订单状态更新） */
  updatedAt: string
}
