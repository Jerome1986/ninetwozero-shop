<script setup lang="ts">
import ManagerPage from '@/pages/home/components/ManagerPage.vue'
import UserPages from '@/pages/home/components/UserPages.vue'
import { useUserStore } from '@/stores'

// 定义store
const userStore = useUserStore()
</script>

<template>
  <!-- 店长端 -->
  <view class="homePages" v-if="userStore.profile.role === 'manager'">
    <ManagerPage></ManagerPage>
  </view>
  <!-- 用户端 -->
  <view class="homePages" v-else>
    <UserPages></UserPages>
  </view>
</template>

<style lang="scss" scoped>
.homePages {
  height: 100%;
}
</style>
