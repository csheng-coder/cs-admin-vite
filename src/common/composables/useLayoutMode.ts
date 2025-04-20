import type { LayoutModeEnum } from "@@/constants/app-key"
import { useSettingsStore } from "@/pinia/stores/settings"

const settingsStore = useSettingsStore()

function setLayoutMode(mode: LayoutModeEnum) {
  settingsStore.layoutMode = mode
}

/** 布局模式 Composable */
export function useLayoutMode() {
  return { setLayoutMode }
}
