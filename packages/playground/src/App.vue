<script lang="ts">
import Vue from 'vue'
import BasicPage from './pages/basic/index.vue'

export default Vue.extend({
  components: { BasicPage },
})
</script>

<template>
  <BasicPage />
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
