<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import Vue from 'vue'
import Modal2 from './modal2.vue'
import Modal3 from './modal3.vue'
import Modal from './modal.vue'

export default Vue.extend({
  name: 'BasicPage',
  data() {
    return {
      show: false,
    }
  },
  methods: {
    openModal() {
      definePortal(Modal, {}, this).then((v) => {
        console.log(v)
      })
    },
    openModal2() {
      definePortal(Modal2, {}, this).then((v) => {
        console.log(v)
      })
    },
    openModal3() {
      definePortal(Modal3, {}, this).then((v) => {
        console.log(v)
      })
    },
  },
})
</script>

<template>
  <div class="main">
    <el-card header="Basic">
      <el-button type="primary" @click="openModal">
        Open Modal
      </el-button>
      <el-button type="primary" @click="openModal2">
        Open Modal 2
      </el-button>
      <el-button type="primary" @click="openModal3">
        Open Modal 3
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.main {
  max-width: 1000px;
  margin: 100px auto;
}
</style>
