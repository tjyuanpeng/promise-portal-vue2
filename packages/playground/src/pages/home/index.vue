<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomePage',
})
</script>

<template>
  <div class="home">
    <h1>promise-portal-vue2</h1>
    <p class="desc">
      将 Vue 2 组件作为 Promise 使用。通过 <code>definePortal</code> 或 <code>usePortal</code>
      打开组件，用 <code>$resolve</code> / <code>$reject</code> 控制结果。
    </p>

    <div class="nav">
      <router-link to="/basic">
        Example 1: Basic (Options API + Vue.extend)
      </router-link>
      <router-link to="/composition">
        Example 2: Composition API (script setup + usePortal)
      </router-link>
      <router-link to="/props">
        Example 3: Props (defineComponent)
      </router-link>
      <router-link to="/reject">
        Example 4: Rejection ($reject)
      </router-link>
      <router-link to="/plain-object">
        Example 5: Plain Object
      </router-link>
      <router-link to="/basic" class="back">
        ← Back to Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 720px;
  margin: 60px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}
.desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 36px;
}
.desc code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.nav a {
  display: block;
  padding: 14px 20px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  color: #409eff;
  text-decoration: none;
  font-size: 15px;
  transition: background 0.2s;
}
.nav a:hover {
  background: #ecf5ff;
}
.back {
  display: none !important;
}
</style>
