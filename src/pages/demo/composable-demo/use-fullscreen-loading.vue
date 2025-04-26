<script lang="ts" setup>
import { useFullscreenLoading } from "@@/composables/useFullscreenLoading"
import { getErrorApi } from "./apis/use-fullscreen-loading"

const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`

const options = {
  text: "正在提交数据...",
  background: "#FFFFFF80",
  svg,
  svgViewBox: "-10, -10, 50, 50"
}

async function handleQuery() {
  try {
    await useFullscreenLoading(getErrorApi, options)()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}
</script>

<template>
  <div class="app-container">
    <el-card header="示例" shadow="never">
      <el-button type="primary" @click="handleQuery">
        查询
      </el-button>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
</style>
