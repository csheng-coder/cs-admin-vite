<script lang="ts" setup>
import { useFetchSelect } from "@@/composables/useFetchSelect"
import { getSelectDataApi } from "./apis/use-fetch-select"

const { loading, options, value } = useFetchSelect({
  api: getSelectDataApi
})
</script>

<template>
  <div class="app-container">
    <el-card mb-20px header="Select 示例" shadow="never" v-loading="loading">
      <el-select v-model="value" filterable>
        <el-option v-for="(item, index) in options" v-bind="item" :key="index" placeholder="请选择" />
      </el-select>
    </el-card>
    <el-card header="Select V2 示例（如果数据量过多，可以选择该组件）" shadow="never" v-loading="loading">
      <el-select-v2 v-model="value" :options="options" filterable placeholder="请选择" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
</style>
