// 统一处理 localStorage

import type { TagView } from "@/pinia/stores/tags-view"
import type { SidebarClosed, SidebarOpened } from "@@/constants/app-key"
import { CacheKey } from "@@/constants/cache-key"

// #region 侧边栏状态
export function getSidebarStatus() {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export function setSidebarStatus(sidebarStatus: SidebarOpened | SidebarClosed) {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}
// #endregion

// #region 标签栏
export function getVisitedViews() {
  const json = localStorage.getItem(CacheKey.VISITED_VIEWS)
  return JSON.parse(json ?? "[]") as TagView[]
}
export function setVisitedViews(views: TagView[]) {
  views.forEach((view) => {
    // 删除不必要的属性，防止 JSON.stringify 处理到循环引用
    delete view.matched
    delete view.redirectedFrom
  })
  localStorage.setItem(CacheKey.VISITED_VIEWS, JSON.stringify(views))
}
export function getCachedViews() {
  const json = localStorage.getItem(CacheKey.CACHED_VIEWS)
  return JSON.parse(json ?? "[]") as string[]
}
export function setCachedViews(views: string[]) {
  localStorage.setItem(CacheKey.CACHED_VIEWS, JSON.stringify(views))
}
// #endregion
