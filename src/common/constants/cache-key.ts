const SYSTEM_NAME = "cs-admin-vite"

/** 缓存数据时用到的 Key */
export class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`
  static readonly CONFIG_LAYOUT = `${SYSTEM_NAME}-config-layout-key`
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`
  static readonly VISITED_VIEWS = `${SYSTEM_NAME}-visited-views-key`
  static readonly CACHED_VIEWS = `${SYSTEM_NAME}-cached-views-key`
  static readonly LOGIN_REMEMBER = `${SYSTEM_NAME}-login-remember`
  static readonly LOGIN_REMEMBER_STATUS = `${SYSTEM_NAME}-login-remember-status`
}
