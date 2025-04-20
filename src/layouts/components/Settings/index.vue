<script lang="ts" setup>
import { removeLayoutsConfig } from "@@/utils/cache/local-storage"
import { Refresh } from "@element-plus/icons-vue"
import SelectLayoutMode from "./SelectLayoutMode.vue"

/** 重置项目配置 */
function resetLayoutsConfig() {
  removeLayoutsConfig()
  location.reload()
}
</script>

<template>
  <div class="setting-container">
    <h4>布局配置</h4>
    <SelectLayoutMode />
    <el-button type="danger" :icon="Refresh" @click="resetLayoutsConfig">
      重 置
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
@import "@@/assets/styles/mixins.scss";

.setting-container {
  padding: 20px;
  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
