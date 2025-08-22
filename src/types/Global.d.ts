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
  /** 用户手机号 */
  originalname: string
  path: string
  mimetype: string
}
