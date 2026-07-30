<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import Vue from 'vue'
import InfoModal from './info-modal.vue'

export default Vue.extend({
  name: 'PropsPage',
  methods: {
    async openModal() {
      const result = await definePortal(InfoModal, {
        title: 'Notification',
        message: 'This is a custom message passed via props.',
        level: 'success',
      }, this)
      this.$message.success(`resolved: ${result}`)
    },
  },
})
</script>

<template>
  <div class="page">
    <h2>Example 3 &mdash; Props (defineComponent)</h2>
    <p class="desc">
      页面用 <code>Vue.extend()</code> 声明，<code>definePortal</code> 第二个参数传递自定义 props。<br>
      弹窗组件使用 <code>defineComponent()</code> 声明，通过 <code>props</code> 选项接收参数。
    </p>
    <el-button type="primary" @click="openModal">
      Open Info Modal
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
