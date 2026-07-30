<script lang="ts">
export default {
  name: 'SimpleDialog',
}
</script>

<template>
  <el-dialog
    :visible="$show"
    title="Plain Object Demo"
    width="400px"
    @close="$resolve('ok')"
  >
    <p>This dialog component is declared as a plain object with <code>export default { ... }</code>.</p>
    <p style="color:#888;font-size:13px;">
      No <code>Vue.extend()</code>, no <code>defineComponent()</code> &mdash; just a plain object.
      Vue 2 handles this transparently in <code>Vue.extend()</code> inside definePortal.
    </p>
  </el-dialog>
</template>
