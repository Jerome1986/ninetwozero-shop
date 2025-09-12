// 解析二维码的参数
export function parseScene(scene: string): Record<string, string> {
  const params: Record<string, string> = {}
  if (!scene) return params

  const parts = scene.split('&')
  for (const part of parts) {
    const [key, value] = part.split('=')
    if (key) params[key] = decodeURIComponent(value || '')
  }
  return params
}
