import { extractFilenameFromUrl } from '@/utils/extractFilename'
import type { HireItem } from '@/types/HireItem'

export const updateImg = (form: HireItem, type: string) => {
  uni.chooseImage({
    success: async (e) => {
      const url = e.tempFilePaths[0]
      const originalname = extractFilenameFromUrl(url)
      console.log('名字', originalname)

      // 上传到后端
      uni.uploadFile({
        url: 'https://h91gpva7y7.gzg.sealos.run/upload/images', // 你后端的上传接口
        filePath: e.tempFilePaths[0],
        name: originalname,
        success: (res) => {
          console.log('上传成功', res)
          // 可以记录后端返回的地址（永久地址）
          if (type === 'font') return (form.icCardFont = res.data)
          if (type === 'back') return (form.icCardBack = res.data)
        },
        fail: (err) => {
          console.error('上传失败', err)
        },
      })
    },
  })
}
