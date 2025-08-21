/**
 * 用户数据类型
 */
export type UserItem = {
  /** 唯一标识 */
  _id: string
  /** 用户昵称 */
  nickname: string
  /** 用户头像 */
  avatarUrl: string
  /** 用户手机号码 */
  mobile: string
  /** 性别 */
  gender: number
  /** 用户角色 */
  role: string
  /** 注册时间 */
  registerTime: string
  /** 账号状态 - active激活 inactive未激活 */
  status: string
  /**  会员等级： 1:基础会员, 2:高级会员, 3:至尊会员 */
  vipLevel: number
  /** 会员注册时间 */
  vipStartTime: string
  /** 会员到期时间 */
  vipEndTime: string
  /** 会员权益： ['折扣9折', '免费配送'] */
  vipBenefits: string[]
}
