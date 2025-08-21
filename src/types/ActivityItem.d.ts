/**
 * 活动数据类型
 */
export type ActivityItem = {
  /** 活动ID（唯一标识） */
  _id: string
  /** 活动标题 */
  title: string
  /** 活动封面图URL */
  cover: string
  /** 活动描述 */
  desc: string
  /** 优惠信息，例如 "满100减20" / "会员专享8折" */
  discount: string
  /** 活动类型: "折扣" | "会员" | "满减" | "赠品" */
  activityType: string
  /** 活动开始时间 (ISO 时间格式: 2025-08-20T10:00:00) */
  startTime: string
  /** 活动结束时间 */
  endTime: string
  /** 活动状态: "未开始" | "进行中" | "已结束" */
  status: string
  /** 活动标签，如 ["热门", "限时", "会员专享"] */
  tags: string[]
  /** 每人参加次数限制，0 表示不限 */
  participateLimit: number
  /** 是否会员专享 */
  memberExclusive: boolean
}
