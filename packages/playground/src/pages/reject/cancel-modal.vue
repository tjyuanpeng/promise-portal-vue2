<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CancelModal',
  methods: {
    handleDelete() {
      this.$resolve('deleted')
    },
    handleCancel() {
      this.$reject('user cancelled')
    },
  },
})
</script>

<template>
  <a-modal
    :visible="$show"
    title="Delete Confirm"
    width="400px"
    @cancel="handleCancel"
  >
    <template slot="footer">
      <a-button @click="handleCancel">
        Cancel
      </a-button>
      <a-button type="danger" @click="handleDelete">
        Delete
      </a-button>
    </template>
    <p>This action cannot be undone. Are you sure you want to delete this item?</p>
  </a-modal>
</template>
