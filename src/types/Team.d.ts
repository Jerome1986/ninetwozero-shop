// 团队课程数据类型
export type TeamItem = {
  /** 唯一ID */
  _id: string
  /** 名称 */
  name: string
  /** 学习周期，如：一周 */
  studyTime: string
  /** 描述 */
  dec: string
  /** 封面图 */
  cover: string
  /** 详情图 */
  imagesList: string[]
  /** 发布时间 */
  publicTime: string
}
