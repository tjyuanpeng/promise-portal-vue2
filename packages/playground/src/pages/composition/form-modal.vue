<script lang="ts" setup>
import { Message } from 'element-ui'
import { usePortalContext } from 'promise-portal-vue2'
import { ref } from 'vue'

const { $resolve } = usePortalContext()

const username = ref('')
const email = ref('')

function handleOk() {
  if (!username.value || !email.value) {
    Message.warning('Please fill in all fields')
    return
  }
  $resolve({ username: username.value, email: email.value })
}
</script>

<template>
  <a-modal
    :visible="$show"
    title="User Form"
    width="480px"
    @cancel="$reject('cancelled')"
    @ok="handleOk"
  >
    <a-form layout="vertical">
      <a-form-item label="Username" required>
        <a-input v-model="username" placeholder="Enter username" />
      </a-form-item>
      <a-form-item label="Email" required>
        <a-input v-model="email" placeholder="Enter email" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
