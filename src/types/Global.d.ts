import type { UserItem } from '@/types/UserItem'

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
 * 生成收款码返回类型
 */

export type QrCode = {
  /**  返回的二维码base64 */
  dataUrl: string
}
