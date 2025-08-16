import { request } from '@/utils/http.ts'
import type { PageResult } from '@/types/Global'
import type { TeamItem } from '@/types/Team'

/**
 * 获取课程列表
 * /team/get
 */

export const teamStudyListGetApi = (pagesNum?: number, pagesSize?: number) => {
  return request<PageResult<TeamItem[]>>({
    method: 'GET',
    url: '/team/get',
    data: { pagesNum, pagesSize },
  })
}
