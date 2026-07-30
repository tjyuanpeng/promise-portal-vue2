<script lang="ts" setup>
import { Message } from 'element-ui'
import { usePortal } from 'promise-portal-vue2'
import FormModal from './form-modal.vue'

const openForm = usePortal(FormModal, {})

async function handleOpen() {
  try {
    const formData = await openForm()
    Message.success(JSON.stringify(formData))
  } catch (reason: any) {
    Message.info(`cancelled: ${reason}`)
  }
}
</script>

<template>
  <div class="page">
    <h2>Example 2 &mdash; Composition API (usePortal)</h2>
    <p class="desc">
      页面组件使用 <code>&lt;script lang="ts" setup&gt;</code> 声明。<br>
      通过 <code>usePortal(component, props)</code> 创建一个打开弹窗的函数，调用时自动以当前组件实例作为 parent。<br>
      弹窗组件同样使用 <code>&lt;script setup&gt;</code>，包含表单输入，确认时通过 <code>$resolve</code> 返回表单数据。
    </p>
    <el-button type="primary" @click="handleOpen">
      Open Form Modal
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
