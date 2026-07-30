<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import Vue from 'vue'
import SimpleDialog from './simple-dialog.vue'

export default Vue.extend({
  name: 'PlainObjectPage',
  methods: {
    async openModal() {
      const v = await definePortal(SimpleDialog, {}, this)
      this.$message.success(`resolved: ${v}`)
    },
  },
})
</script>

<template>
  <div class="page">
    <h2>Example 5 &mdash; Plain Object</h2>
    <p class="desc">
      弹窗组件使用普通的 <code>export default { ... }</code> 对象声明，无需 <code>Vue.extend()</code>
      或 <code>defineComponent()</code> 包裹。最简单的声明方式。
    </p>
    <el-button type="primary" @click="openModal">
      Open Simple Dialog
    </el-button>
    <router-link to="/" class="back">
      ← Back to Home
    </router-link>
  </div>
</template>

<style scoped>
.page { max-width: 720px; margin: 40px auto; padding: 0 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
h2 { margin-bottom: 8px; }
.desc { color: #888; font-size: 14px; line-height: 1.7; margin-bottom: 24px; }
.desc code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
.back { display: inline-block; margin-left: 16px; font-size: 13px; color: #909399; text-decoration: none; vertical-align: middle; }
</style>
