// 商品信息接口
export type ProductItem = {
  /** 商品ID（MongoDB 自动生成的唯一标识） */
  _id: string
  /** 商品名称 */
  name: string
  /** 商品描述（简要说明） */
  dec: string
  /** 商品原价（未打折前价格，单位：元） */
  originalPrice: number
  /** 当前售价（促销/实际出售价格，单位：元） */
  currentPrice: number
  /** 商品封面图 URL */
  cover: string
  /** 商品详情图片 URL 数组 */
  proImages: string[]
  /** 浏览量（用于排序和热度统计） */
  lookNum: number
}
