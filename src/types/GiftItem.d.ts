// 礼品数据类型
export type GiftItem = {
  /** 唯一ID（MongoDB自动生成的 _id） */
  _id: string
  /** 封面图URL */
  cover: string
  /** 礼物名称 */
  name: string
  /** 礼物描述/介绍 */
  dec: string
  /** 浏览量（被查看的次数） */
  lookNum: number
  /** 原价（单位：元） */
  originalPrice: number
  /** 当前售价（单位：元） */
  currentPrice: number
}
