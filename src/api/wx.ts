import { request } from '@/utils/http.ts'
import type { WechatPayParams } from '@/types/WechatPay'

/**
 * 微信统一下单接口
 * /wx/pay
 * @param {string} userId - 当前用户id
 * @param {string} vipId - 当前vip的产品id
 * @param {number} vipLevel - 会员等级
 * @param {string} vipLevelText - 对应会员等级的文本说明
 * @param {number} discount - 对应的会员消费折扣
 * @param {number} giftCount - 赠送的会员贴膜次数
 * @param {string} term - 会员期限说明
 * @param {number} totalFee - 本次订单的支付价格
 * @param {string} description - 产品内容的中文描述
 */

export const wxPayApi = (
  userId: string,
  vipId: string,
  vipLevel: number,
  vipLevelText: string,
  discount: number,
  giftCount: number,
  term: string,
  totalFee: number,
  description: string,
) => {
  return request<WechatPayParams>({
    method: 'POST',
    url: '/wx/pay',
    data: {
      userId,
      vipId,
      vipLevel,
      vipLevelText,
      discount,
      giftCount,
      term,
      totalFee,
      description,
    },
  })
}
