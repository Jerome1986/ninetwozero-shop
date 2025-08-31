// utils.js
export function padZero(num: any) {
  return num < 10 ? '0' + num : num
}

// 格式化时间
export function formatTimestamp(timestamp: any) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = padZero(date.getMonth() + 1) // 月份是从0开始的，所以需要+1
  const day = padZero(date.getDate())
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  const seconds = padZero(date.getSeconds())

  // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return `${year}-${month}-${day}`
}

// 性别转换
export const formatGender = (gender: number) => {
  switch (gender) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return '未知'
  }
}

// 角色转换
export const formatRole = (role: string, vipLevel: number = 0): string => {
  const vipMap: Record<number, string> = {
    1: '基础会员',
    2: '高级会员',
    3: '至尊会员',
  }

  if (role === 'user') return '普通用户'
  if (role === 'vip') return vipMap[vipLevel] || '会员'
  if (role === 'manager') return '店长'
  if (role === 'admin') return '管理员'

  return '未知角色'
}
