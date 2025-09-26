import type { UserItem } from '@/types/UserItem'
import type { StoreItem } from '@/types/StoreItem.d..ts'
import type { CommissionTask } from '@/types/Flow'

/** 通用分页结果类型 */
export type PageResult<T> = {
  /** 列表数据 */
  list: T
  /** 当前页数 */
  pageNum: number
  /** 总条数 */
  total: number
  /** 总页数 */
  totalPages: number
}

/**
 * 通用更新结果类型
 */
export type UpdateResult = {
  acknowledged: boolean
}

/**
 * 通用添加结果类型
 */

export type AddResult = {
  /** 添加成功后的id */
  insertedId: string
}

/**
 * 文件类型
 */
export type File = {
  /** 原始文件名，上传前的文件名，如 'photo.jpg' */
  originalname: string
  /** 存储路径或文件在服务器上的相对路径，如 '/uploads/2025/08/30/photo.jpg' */
  path: string
  /** 文件 MIME 类型，用于标识文件格式，如 'image/jpeg', 'application/pdf' */
  mimetype: string
}

/**
 * 通用查询下级邀请类型
 */
export type inviterItem = {
  /** 一级好友列表 */
  firstLevel: UserItem[]
  /** 二级好友列表 */
  subLevel: UserItem[]
}

/**
 * 通用查询门店下级类型
 */
export type inviterStoreItem = {
  /** 一级门店列表 */
  firstStore: StoreItem[]
  /** 所有一级门店的流水 */
  firstFlow: CommissionTask[]
  /** 二级门店列表 */
  subStore: StoreItem[]
  /** 所有二级门店的流水 */
  subFlow: CommissionTask[]
}
/**
 * 生成收款码返回类型
 */

export type QrCode = {
  /**  返回的二维码base64 */
  dataUrl: string
}

/**
 * 生成邀请码返回类型
 */

export type InviterCode = {
  /**  返回的二维码base64 */
  qrCodeUrl: string
}

/**
 * 流水合计类型  今日 昨日 本周
 */
export type flowTotal = {
  id: string
  amount: number
  text: string
}

/**
 * 查询该门店是否有上级返回类型
 */

export type CheckStoreParentResult = {
  /** 直属上级的门店id */
  firstStoreId: string | null
  /** 上级的上级的门店id */
  secondStoreId: string | null
}
