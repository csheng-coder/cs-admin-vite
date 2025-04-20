<script lang="ts" setup>
import { useSettingsStore } from "@/pinia/stores/settings"
import { removeLayoutsConfig } from "@@/utils/cache/local-storage"
import { Refresh } from "@element-plus/icons-vue"
import SelectLayoutMode from "./SelectLayoutMode.vue"

const settingsStore = useSettingsStore()

// 使用 storeToRefs 将提取的属性保持其响应性
const {
  cacheTagsView
} = storeToRefs(settingsStore)

/** 定义 switch 设置项 */
const switchSettings = {
  是否缓存标签栏: cacheTagsView
}

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
    <el-divider />
    <h4>功能配置</h4>
    <div v-for="(settingValue, settingName, index) in switchSettings" :key="index" class="setting-item">
      <span class="setting-name">{{ settingName }}</span>
      <el-switch v-model="settingValue.value" />
    </div>
    <el-button type="danger" :icon="Refresh" @click="resetLayoutsConfig">
      重 置
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
@import "@@/assets/styles/mixins.scss";

.setting-container {
  padding: 20px;
  .setting-item {
    font-size: 14px;
    color: var(--el-text-color-regular);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-name {
      @extend %ellipsis;
    }
  }
  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
