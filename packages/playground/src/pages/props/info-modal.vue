<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoModal',
  props: {
    title: { type: String, default: 'Info' },
    message: { type: String, default: '' },
    level: { type: String, default: 'info' },
  },
  computed: {
    iconMapping(): Record<string, string> {
      return {
        success: '✔',
        info: 'ℹ',
        warning: '⚠',
        error: '✖',
      }
    },
  },
})
</script>

<template>
  <el-dialog :visible="$show" :title="title" width="420px" @close="$resolve('closed')">
    <div class="info-body">
      <span class="info-icon" :class="level">{{ iconMapping[level] || 'ℹ' }}</span>
      <p>{{ message }}</p>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="$resolve('got it')">Got it</el-button>
    </span>
  </el-dialog>
</template>

<style scoped>
.info-body {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 8px 0;
}
.info-body p {
  margin: 0;
  line-height: 1.6;
  color: #333;
}
.info-icon {
  font-size: 20px;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.info-icon.success { background: #f0f9eb; color: #67c23a; }
.info-icon.info    { background: #f4f4f5; color: #909399; }
.info-icon.warning { background: #fdf6ec; color: #e6a23c; }
.info-icon.error   { background: #fef0f0; color: #f56c6c; }
</style>
