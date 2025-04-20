<script lang="ts" setup>
import { getCssVar, setCssVar } from "@@/utils/css"
import { useResize } from "./composables/useResize"
import LeftMode from "./modes/LeftMode.vue"

// Layout 布局响应式
useResize()

// #region 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVarName = "--v3-tagsview-height"
const v3TagsviewHeight = getCssVar(cssVarName)
watchEffect(() => setCssVar(cssVarName, v3TagsviewHeight))
// #endregion
</script>

<template>
  <div>
    <LeftMode />
  </div>
</template>
