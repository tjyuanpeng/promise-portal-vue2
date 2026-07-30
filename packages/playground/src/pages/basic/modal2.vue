<script lang="ts">
import './t.js'

export default ({
  name: 'Modal2',
  data() {
    return {
    }
  },
  methods: {
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
  </a-modal>
</template>
