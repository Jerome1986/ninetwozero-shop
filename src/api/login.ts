import { request } from '@/utils/http.ts'
import type { UserItem } from '@/types/UserItem'

/**
 * 微信手机号登录
 * /wx/login
 */

export const wxLoginApi = (code: string, encryptedData: string, iv: string) => {
  return request<UserItem>({
    method: 'POST',
    url: '/wx/login',
    data: {
      code,
      encryptedData,
      iv,
    },
  })
}
