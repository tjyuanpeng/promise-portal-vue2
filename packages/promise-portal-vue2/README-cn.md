# promise-portal-vue2

像调用函数一样使用 Vue 2 组件。打开弹窗、对话框或任意组件 &mdash; 通过 `await` 获取结果。

## 安装

```bash
pnpm add promise-portal-vue2
```

需要 **Vue >= 2.6.0**（Vue 2.7+ 支持组合式 API）。

## 快速开始

```vue
<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import ConfirmDialog from './ConfirmDialog.vue'

export default {
  methods: {
    async confirmDelete() {
      try {
        await definePortal(ConfirmDialog, { title: '确认删除？' }, this)
        console.log('用户确认')
      }
      catch (reason) {
        console.log('已取消:', reason)
      }
    },
  },
}
</script>
```

Portal 组件通过 `$resolve` / `$reject` 控制结果：

```vue
<!-- ConfirmDialog.vue -->
<script lang="ts">
export default {
  props: ['title'],
}
</script>

<template>
  <el-dialog :visible="$show" :title="title" @close="$reject('dismissed')">
    <span slot="footer">
      <el-button @click="$reject('cancelled')">取消</el-button>
      <el-button type="primary" @click="$resolve('confirmed')">确定</el-button>
    </span>
  </el-dialog>
</template>
```

## 设计动机

传统方式需要手动维护 `show` 变量和事件监听来控制弹窗：

```vue
<!-- 之前：手动管理显示状态 -->
<script>
export default {
  data() { return { show: false } },
  methods: {
    open() { this.show = true },
    onClosed() { this.show = false },
  },
}
</script>
<template>
  <el-button @click="open">打开</el-button>
  <Comp v-model="show" @closed="onClosed" />
</template>
```

使用 `promise-portal-vue2`，弹窗流程变为简洁的 `async/await`：

```vue
<!-- 之后：Promise 风格 -->
<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import Comp from './Comp.vue'

export default {
  methods: {
    async open() {
      const result = await definePortal(Comp, {}, this)
      console.log(result)
    },
  },
}
</script>
<template>
  <el-button @click="open">打开</el-button>
</template>
```

无需 `show` 标记、无需事件绑定。结果直接返回，错误流入 `catch`。

## 使用指南

### 注入属性

调用 `definePortal(component, props, parent)` 后，portal 组件实例会自动获得三个响应式属性：

| 属性       | 类型       | 说明 |
|------------|-----------|------|
| `$resolve` | `(value?: any) => void` | 解析 Promise，可选传入返回值 |
| `$reject`  | `(reason?: any) => void` | 拒绝 Promise，可选传入原因 |
| `$show`    | `boolean`  | 响应式显示状态（初始为 `true`，销毁前设为 `false`） |

在模板中可以直接使用（`$resolve()`），在脚本中通过 `this.$resolve()` 访问。

### 生命周期

1. `definePortal` 通过 `Vue.extend(component)` 创建组件实例。
2. 实例挂载并追加到 `document.body`。
3. `$show` 设置为 `true`，弹窗打开。
4. 当 `$resolve` 或 `$reject` 被调用时：
   - `$show` 设置为 `false`。
   - 等待 300ms（用于退出动画），然后调用 `$destroy()` + `$el.remove()`。
   - Promise 被解析或拒绝。
5. 如果父组件在 portal 释放前被销毁，Promise 会被拒绝并返回 `Error('REASON_PARENT_DESTROYED')`。

## API 参考

### `definePortal(component, props, parent)`

创建 portal 并返回 Promise。

| 参数        | 类型                                                                  | 说明 |
|-------------|-----------------------------------------------------------------------|------|
| `component` | `VueConstructor \| DefineComponent`                                   | 要渲染的组件 |
| `props`     | `Record<string, any>`                                                 | 传递给组件的 props |
| `parent`    | `ComponentPublicInstance \| Vue`                                      | 当前组件实例（`this`） |

返回 `Promise<any>` — 传入 `$resolve()` 的值会被 resolve，传入 `$reject()` 的原因会被 reject。

```ts
import { definePortal } from 'promise-portal-vue2'
import MyModal from './MyModal.vue'

export default {
  methods: {
    async openModal() {
      const result = await definePortal(MyModal, {
        title: '提示',
        data: { id: 1 },
      }, this)
      console.log('结果:', result)
    },
  },
}
```

### `usePortal(component, props?)`

组合式 API 辅助函数。返回一个函数，调用时自动以当前组件实例作为 parent 调用 `definePortal`。

| 参数        | 类型                   | 说明 |
|-------------|------------------------|------|
| `component` | `VueConstructor \| DefineComponent` | 要渲染的组件 |
| `props`     | `Record<string, any>`  | 传递给组件的 props（默认 `{}`） |

返回 `() => Promise<any>` — 调用即可打开 portal。

```vue
<script lang="ts" setup>
import { usePortal } from 'promise-portal-vue2'
import FormModal from './FormModal.vue'

const openForm = usePortal(FormModal, {})

async function handleOpen() {
  try {
    const data = await openForm()
    console.log('表单数据:', data)
  }
  catch (reason) {
    console.log('已取消:', reason)
  }
}
</script>
```

> **注意：** 必须在 `setup()` 或 `<script setup>` 内调用，否则抛出异常。

### `usePortalContext()`

在 portal 组件内部通过 `setup()` 获取 `$resolve`、`$reject` 和 `$show` 属性。

返回 `{ $resolve, $reject, $show }`。

```vue
<!-- 在 portal 组件内部 -->
<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import { usePortalContext } from 'promise-portal-vue2'

const instance = getCurrentInstance()
const { $resolve } = usePortalContext()

const formData = ref({ name: '', email: '' })

function submit() {
  $resolve({ ...formData.value })
}
</script>

<template>
  <a-modal :visible="$show" title="表单" @ok="submit" @cancel="$reject('cancelled')">
    <input v-model="formData.name" />
    <input v-model="formData.email" />
  </a-modal>
</template>
```

> **注意：** 必须在 `setup()` 或 `<script setup>` 内调用。

## 示例

完整可运行示例见 playground，涵盖不同组件声明方式：

| 声明方式 | 说明 |
|----------|------|
| `Vue.extend()` | Options API 组件（经典 Vue 2） |
| `defineComponent()` | Options API，完整 TypeScript 支持 |
| 纯对象 | 最简形式：`export default { ... }` |
| `<script setup>` | 组合式 API（Vue 2.7+） |

```bash
pnpm dev
# 打开 http://localhost:9002
```

## 工作原理

```
definePortal(Comp, props, this)
  │
  ├─ Vue.extend(Comp)              → 组件构造函数
  ├─ new A({ parent, propsData })   → 组件实例
  ├─ 注入 $resolve / $reject / $show
  ├─ $mount() + 追加到 <body>
  ├─ $show = true                    → 弹窗打开
  │
  │  ... 用户交互 ...
  │
  ├─ $resolve(value) ──────────────→ Promise resolve
  │  或 $reject(reason) ───────────→ Promise reject
  │
  └─ 清理:
       $show = false
       等待 300ms（退出动画）
       $destroy() + $el.remove()
```

## License

MIT
