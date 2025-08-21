// 一级分类数据类型
export type CateItem = {
  /**唯一标识*/
  _id: string
  /**分类名称*/
  name: string
  /**排序*/
  sort: number
  /** 分类类型 1 - 手机产品展示  2 或者其他 为 礼品或者产品的列表区域 */
  type: number
}

/**
 * 手机品牌数据类型
 */

export type PhoneItem = {
  /** 唯一标识 */
  _id: string
  /**手机品牌名称 */
  name: string
  /**所属类型的id */
  parent_id: string
}

/**
 * 手机品牌型号数据类型
 */

export type BrandModeItem = {
  /** 唯一标识 */
  _id: string
  /** 封面图 */
  cover: string
  /**手机品牌名称 */
  name: string
  /**所属手机品牌的id */
  parent_id: string
}
