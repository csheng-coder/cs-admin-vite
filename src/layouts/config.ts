import { LayoutModeEnum } from "@@/constants/app-key"
import { getLayoutsConfig } from "@@/utils/cache/local-storage"

/** 项目配置类型 */
export interface LayoutsConfig {
  /** 布局模式 */
  layoutMode: LayoutModeEnum
}

/** 默认配置 */
const DEFAULT_CONFIG: LayoutsConfig = {
  layoutMode: LayoutModeEnum.Left
}

/** 项目配置 */
export const layoutsConfig: LayoutsConfig = { ...DEFAULT_CONFIG, ...getLayoutsConfig() }
