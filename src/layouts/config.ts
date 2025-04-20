import { LayoutModeEnum } from "@@/constants/app-key"
import { getLayoutsConfig } from "@@/utils/cache/local-storage"

/** 项目配置类型 */
export interface LayoutsConfig {
  /** 是否显示设置按钮和面板 */
  showSettings: boolean
  /** 布局模式 */
  layoutMode: LayoutModeEnum
  /** 是否缓存标签栏 */
  cacheTagsView: boolean
}

/** 默认配置 */
const DEFAULT_CONFIG: LayoutsConfig = {
  layoutMode: LayoutModeEnum.Left,
  showSettings: true,
  cacheTagsView: false
}

/** 项目配置 */
export const layoutsConfig: LayoutsConfig = { ...DEFAULT_CONFIG, ...getLayoutsConfig() }
