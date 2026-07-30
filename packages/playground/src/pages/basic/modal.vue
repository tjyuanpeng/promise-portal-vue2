<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import { defineComponent } from 'vue'
import Modal2 from './modal2.vue'

export default defineComponent({
  name: 'Modal',
  data() {
    return {
      a: 1,
    }
  },
  methods: {
    openModal2() {
      definePortal(Modal2, {}, this).then((v) => {
        console.log(v)
      })
    },
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
    <el-button type="primary" @click="openModal2">
      Open Modal 2
    </el-button>
  </el-dialog>
</template>
