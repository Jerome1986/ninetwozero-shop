import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CartItem, ShoppingCart } from '@/types/Cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 购物车基础数据列表 - 确保初始化为数组
    const cartList = ref<ShoppingCart>([])

    // 初始化时处理持久化数据
    try {
      const raw = uni.getStorageSync('cart')
      if (raw) {
        let data
        try {
          data = JSON.parse(raw)
        } catch {
          data = []
        }

        // 兼容旧数据结构
        if (Array.isArray(data)) {
          cartList.value = data
        } else if (data && typeof data === 'object' && 'devices' in data) {
          // 旧结构转换为新结构
          const newData: ShoppingCart = []
          data.devices.forEach((device: any) => {
            const brandIndex = newData.findIndex((b) => b.brand === device.brand)
            if (brandIndex === -1) {
              // 新品牌
              newData.push({
                brand: device.brand,
                models: [
                  {
                    model: device.model,
                    items: device.items || [],
                  },
                ],
              })
            } else {
              // 已有品牌，添加型号
              newData[brandIndex].models.push({
                model: device.model,
                items: device.items || [],
              })
            }
          })
          cartList.value = newData
        } else {
          cartList.value = []
        }
      }
    } catch (e) {
      console.error('初始化购物车失败', e)
      cartList.value = []
    }

    /** 添加商品到购物车 */
    const addCartItem = (brand: string, model: string, newItem: CartItem) => {
      // 确保 cartList.value 是数组
      if (!Array.isArray(cartList.value)) {
        cartList.value = []
      }

      // 查找品牌
      let brandGroup = cartList.value.find((b) => b.brand === brand)
      if (!brandGroup) {
        // 没有该品牌，新建品牌分组
        brandGroup = { brand, models: [] }
        cartList.value.push(brandGroup)
      }

      // 查找型号
      let modelGroup = brandGroup.models.find((m) => m.model === model)
      if (!modelGroup) {
        // 没有该型号，新建型号分组
        modelGroup = { model, items: [] }
        brandGroup.models.push(modelGroup)
      }

      // 查找商品
      const existingItem = modelGroup.items.find((i) => i.id === newItem.id)
      if (existingItem) {
        // 已存在，数量累加
        existingItem.quantity += newItem.quantity || 1
      } else {
        // 不存在，添加新商品
        modelGroup.items.push({ ...newItem, quantity: newItem.quantity || 1 })
      }
    }

    // 清空购物车
    const clearCart = () => {
      cartList.value = []
    }

    // 设置商品选中状态
    const setSelected = (brand: string, model: string, itemId: string, selected: boolean) => {
      if (!Array.isArray(cartList.value)) {
        cartList.value = []
        return
      }

      const brandGroup = cartList.value.find((b) => b.brand === brand)
      if (!brandGroup) return

      const modelGroup = brandGroup.models.find((m) => m.model === model)
      if (!modelGroup) return

      const item = modelGroup.items.find((i) => i.id === itemId)
      if (item) item.selected = !selected
    }

    // 增加商品数量
    const increaseQuantity = (brand: string, model: string, itemId: string) => {
      if (!Array.isArray(cartList.value)) {
        cartList.value = []
        return
      }

      const brandGroup = cartList.value.find((b) => b.brand === brand)
      if (!brandGroup) return

      const modelGroup = brandGroup.models.find((m) => m.model === model)
      if (!modelGroup) return

      const item = modelGroup.items.find((i) => i.id === itemId)
      if (item) item.quantity += 1
    }

    // 减少商品数量
    const decreaseQuantity = (brand: string, model: string, itemId: string) => {
      if (!Array.isArray(cartList.value)) {
        cartList.value = []
        return
      }

      const brandGroup = cartList.value.find((b) => b.brand === brand)
      if (!brandGroup) return

      const modelGroup = brandGroup.models.find((m) => m.model === model)
      if (!modelGroup) return

      const item = modelGroup.items.find((i) => i.id === itemId)
      if (item && item.quantity > 1) item.quantity -= 1
    }

    // 删除商品
    const removeCartItem = (brand: string, model: string, itemId: string) => {
      if (!Array.isArray(cartList.value)) {
        cartList.value = []
        return
      }

      const brandGroup = cartList.value.find((b) => b.brand === brand)
      if (!brandGroup) return

      const modelGroup = brandGroup.models.find((m) => m.model === model)
      if (!modelGroup) return

      // 移除商品
      modelGroup.items = modelGroup.items.filter((i) => i.id !== itemId)

      // 如果该型号下没有商品了，移除该型号
      if (modelGroup.items.length === 0) {
        brandGroup.models = brandGroup.models.filter((m) => m.model !== model)
      }

      // 如果该品牌下没有型号了，移除该品牌
      if (brandGroup.models.length === 0) {
        cartList.value = cartList.value.filter((b) => b.brand !== brand)
      }
    }

    /** 计算购物车总金额 */
    const cartTotal = computed(() => {
      if (!Array.isArray(cartList.value)) return 0

      return cartList.value.reduce((total, brandGroup) => {
        return (
          total +
          brandGroup.models.reduce((brandSum, modelGroup) => {
            return (
              brandSum +
              modelGroup.items
                .filter((item) => item.selected)
                .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
            )
          }, 0)
        )
      }, 0)
    })

    // 购物车总数量
    const cartCount = computed(() => {
      if (!Array.isArray(cartList.value)) return 0

      return cartList.value.reduce((total, brandGroup) => {
        return (
          total +
          brandGroup.models.reduce((brandSum, modelGroup) => {
            return brandSum + modelGroup.items.reduce((sum, item) => sum + item.quantity, 0)
          }, 0)
        )
      }, 0)
    })

    // 所有已选择的商品
    const selectedItems = computed(() => {
      if (!Array.isArray(cartList.value)) return []

      return cartList.value
        .map((brandGroup) => {
          return {
            ...brandGroup,
            models: brandGroup.models
              .map((modelGroup) => {
                return {
                  ...modelGroup,
                  items: modelGroup.items.filter((item) => item.selected),
                }
              })
              .filter((modelGroup) => modelGroup.items.length > 0), // 没有选中商品的型号直接剔除
          }
        })
        .filter((brandGroup) => brandGroup.models.length > 0) // 没有选中型号的品牌直接剔除
    })

    return {
      cartList,
      addCartItem,
      removeCartItem,
      clearCart,
      setSelected,
      cartTotal,
      cartCount,
      selectedItems,
      increaseQuantity,
      decreaseQuantity,
    }
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
