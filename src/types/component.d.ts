/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import ProductList from '@/components/ProductList.vue'

declare module 'vue' {
  export interface GlobalComponents {
    ProductList: typeof ProductList
  }
}

export type ProductListInstance = InstanceType<typeof ProductList>
