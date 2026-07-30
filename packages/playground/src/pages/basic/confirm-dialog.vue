<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfirmDialog',
  methods: {
    handleConfirm() {
      this.$resolve('accepted')
    },
    handleCancel() {
      this.$reject('dismissed')
    },
  },
})
</script>

<template>
  <el-dialog
    :visible="$show"
    title="Confirm"
    width="400px"
    @close="handleCancel"
  >
    <p>Are you sure you want to proceed?</p>
    <span slot="footer">
      <el-button @click="handleCancel">Cancel</el-button>
      <el-button type="primary" @click="handleConfirm">Confirm</el-button>
    </span>
  </el-dialog>
</template>
