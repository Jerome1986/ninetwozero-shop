import { request } from '@/utils/http.ts'
import type { UserItem } from '@/types/UserItem'
import type { inviterItem, UpdateResult } from '@/types/Global'
import type { InviterCode } from '@/types/Global'

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

/**
 * 获取当前用户的邀请码获取下级用户列表
 * /user/inviter
 * @param {string} referralCode - 当前用户自身的邀请码
 */

export const userInviteGetApi = (referralCode: string) => {
  return request<inviterItem>({
    method: 'GET',
    url: '/user/inviter',
    data: { referralCode },
  })
}

/**
 * 生成用户邀请码链接
 * /qrCode/friends
 * @param referralCode - 用户自身邀请码
 */
export const addUserInviterCodeApi = (referralCode: string) => {
  return request<InviterCode>({
    method: 'POST',
    url: '/qrCode/friends',
    data: { referralCode },
  })
}
