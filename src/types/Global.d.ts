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
