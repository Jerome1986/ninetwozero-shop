import { request } from '@/utils/http.ts'
import type { UserItem } from '@/types/UserItem'
import type { UpdateResult } from '@/types/Global'

/**
 * 根据用户id获取用户信息
 * /user/byId
 * @param {string} userId - 用户id
 */

export const userInfoGetApi = (userId: string) => {
  return request<UserItem>({
    method: 'GET',
    url: '/user/byId',
    data: { userId },
  })
}

/**
 * 更新当前用户信息
 * /user/update
 */

export const userInfoUpdateApi = (
  userId: string,
  mobile: string,
  avatarUrl: string,
  gender: number,
  nickname: string,
) => {
  return request<UpdateResult>({
    method: 'POST',
    url: '/user/update',
    data: { userId, mobile, avatarUrl, gender, nickname },
  })
}
