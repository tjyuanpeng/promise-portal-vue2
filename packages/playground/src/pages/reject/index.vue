<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import Vue from 'vue'
import CancelModal from './cancel-modal.vue'

export default Vue.extend({
  name: 'RejectPage',
  methods: {
    async openModal() {
      try {
        await definePortal(CancelModal, {}, this)
        this.$message.success('operation confirmed')
      } catch (reason: any) {
        this.$message.error(`operation cancelled: ${reason}`)
      }
    },
  },
})
</script>

<template>
  <div class="page">
    <h2>Example 4 &mdash; Rejection ($reject)</h2>
    <p class="desc">
      弹窗组件使用 <code>Vue.extend()</code> 声明，提供确认和取消按钮。<br>
      取消时调用 <code>$reject(reason)</code>，父组件通过 <code>try/catch</code> 处理拒绝逻辑。
    </p>
    <el-button type="primary" @click="openModal">
      Open Cancelable Modal
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
