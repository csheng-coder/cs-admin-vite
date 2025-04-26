<script lang="ts" setup>
import { useUserStore } from "@/pinia/stores/user"
import SvgDashboard from "./images/dashboard.svg?component" // vite-svg-loader 插件的功能

const userStore = useUserStore()
const isAdmin = userStore.roles.includes("admin")
</script>

<template>
  <div class="app-container flex-center flex-col">
    <SvgDashboard class="w-600px max-w-full" />
    <p>欢迎来到「{{ isAdmin ? "Admin" : "Editor" }}」角色专属首页</p>
  </div>
</template>

<style lang="scss" scoped>
</style>
