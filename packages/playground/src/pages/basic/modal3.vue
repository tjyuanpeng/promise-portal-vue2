<script lang="ts" setup>
import { usePortal } from 'promise-portal-vue2'
import Modal from './modal.vue'

const showModal = usePortal(Modal, {})
// const test = () => showModal()
</script>

<template>
  <a-modal
    :visible="$show"
    title="Hello"
    @cancel="$resolve()"
  >
    <p>This is a modal dialog.</p>
    <a-button @click="showModal">
      test
    </a-button>
  </a-modal>
</template>
