<script lang="ts">
import { defineComponent } from 'vue'
import './t.js'

export default defineComponent({
  name: 'Modal',
  data() {
    return {
    }
  },
  methods: {
  },
})
</script>

<template>
  <el-dialog
    :visible="$show"
    title="Hello"
    @close="$resolve()"
  >
    <p>This is a modal dialog.</p>
  </el-dialog>
</template>
