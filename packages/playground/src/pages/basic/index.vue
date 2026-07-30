<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import Vue from 'vue'
import ConfirmDialog from './confirm-dialog.vue'

export default Vue.extend({
  name: 'BasicPage',
  methods: {
    async openModal() {
      try {
        const result = await definePortal(ConfirmDialog, {}, this)
        this.$message.success(`confirmed: ${result}`)
      } catch (reason: any) {
        this.$message.info(`cancelled: ${reason}`)
      }
    },
  },
})
</script>

<template>
  <div class="page">
    <h2>Example 1 &mdash; Options API (Vue.extend)</h2>
    <p class="desc">
      页面组件使用 <code>Vue.extend()</code> 声明，通过 <code>definePortal(component, props, this)</code> 打开弹窗。<br>
      弹窗组件使用 Element UI <code>&lt;el-dialog&gt;</code>，通过 <code>$resolve()</code> / <code>$reject()</code> 返回结果。
    </p>
    <el-button type="primary" @click="openModal">
      Open Confirm Dialog
    </el-button>
    <router-link to="/" class="back">
      ← Back to Home
    </router-link>
  </div>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
h2 { margin-bottom: 8px; }
.desc {
  color: #888;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 24px;
}
.desc code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}
.back {
  display: inline-block;
  margin-left: 16px;
  font-size: 13px;
  color: #909399;
  text-decoration: none;
  vertical-align: middle;
}
</style>
