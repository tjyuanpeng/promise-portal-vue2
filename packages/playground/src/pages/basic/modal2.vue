<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import Modal from './modal.vue'

export default ({
  name: 'Modal2',
  data() {
    return {
    }
  },
  methods: {
    test2() {
      this.$resolve()
    },
    test() {
      definePortal(Modal, {}, this).then((v) => {
        console.log(v)
      })
    },
  },
})
</script>

<template>
  <a-modal
    :visible="$show"
    title="Hello"
    @cancel="$resolve()"
  >
    <p>This is a modal dialog.</p>
    <a-button @click="test">
      Open Modal
    </a-button>
  </a-modal>
</template>
