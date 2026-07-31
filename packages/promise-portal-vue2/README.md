# promise-portal-vue2

Use Vue 2 components as Promise-like functions. Open a dialog, modal, or any component &mdash; and `await` its result.

## Installation

```bash
pnpm add promise-portal-vue2
```

Requires **Vue >= 2.6.0** (Vue 2.7+ for Composition API support).

## Quick Start

```vue
<script lang="ts">
import { definePortal } from 'promise-portal-vue2'
import ConfirmDialog from './ConfirmDialog.vue'

export default {
  methods: {
    async confirmDelete() {
      try {
        await definePortal(ConfirmDialog, { title: 'Delete?' }, this)
        console.log('user confirmed')
      }
      catch (reason) {
        console.log('cancelled:', reason)
      }
    },
  },
}
</script>
```

The portal component uses `$resolve` / `$reject` to control the result:

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
      <el-button @click="$reject('cancelled')">Cancel</el-button>
      <el-button type="primary" @click="$resolve('confirmed')">OK</el-button>
    </span>
  </el-dialog>
</template>
```

## Motivation

Traditionally, dialogs in Vue are controlled via a `show` ref and event listeners:

```vue
<!-- Before: imperative visibility management -->
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
  <el-button @click="open">Open</el-button>
  <Comp v-model="show" @closed="onClosed" />
</template>
```

With `promise-portal-vue2`, the dialog flow becomes a simple `async/await` expression:

```vue
<!-- After: Promise-style -->
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
  <el-button @click="open">Open</el-button>
</template>
```

No `show` flag, no event wiring. Results are returned directly. Error paths flow into `catch`.

## Usage Guide

### Injected Properties

When you call `definePortal(component, props, parent)`, the portal component instance receives three reactive properties:

| Property   | Type      | Description |
|------------|-----------|-------------|
| `$resolve` | `(value?: any) => void` | Resolve the Promise with an optional value |
| `$reject`  | `(reason?: any) => void` | Reject the Promise with an optional reason |
| `$show`    | `boolean`  | Reactive visibility flag (starts `true`, set to `false` before destroy) |

These are accessible in both templates (`$resolve()`) and scripts (`this.$resolve()`).

### Lifecycle

1. `definePortal` creates a Vue instance via `Vue.extend(component)`.
2. The instance is mounted and appended to `document.body`.
3. `$show` is set to `true`, triggering the dialog to open.
4. When `$resolve` or `$reject` is called:
   - `$show` is set to `false`.
   - After 300ms (for exit animation), `$destroy()` + `$el.remove()` are called.
   - The Promise resolves or rejects.
5. If the parent component is destroyed before the portal is released, the Promise is rejected with `Error('REASON_PARENT_DESTROYED')`.

## API Reference

### `definePortal(component, props, parent)`

Creates a portal and returns a `Promise`.

| Parameter   | Type                                                                  | Description |
|-------------|-----------------------------------------------------------------------|-------------|
| `component` | `VueConstructor \| DefineComponent`                                   | The component to render as a portal |
| `props`     | `Record<string, any>`                                                 | Props passed to the component |
| `parent`    | `ComponentPublicInstance \| Vue`                                      | The current component instance (`this`) |

Returns `Promise<any>` — resolves with the value passed to `$resolve()`, rejects with the reason passed to `$reject()`.

```ts
import { definePortal } from 'promise-portal-vue2'
import MyModal from './MyModal.vue'

export default {
  methods: {
    async openModal() {
      const result = await definePortal(MyModal, {
        title: 'Hello',
        data: { id: 1 },
      }, this)
      console.log('resolved:', result)
    },
  },
}
```

### `usePortal(component, props?)`

Composition API helper. Returns a thunk that calls `definePortal` with the current component as parent.

| Parameter   | Type                   | Description |
|-------------|------------------------|-------------|
| `component` | `VueConstructor \| DefineComponent` | The component to render |
| `props`     | `Record<string, any>`  | Props passed to the component (default `{}`) |

Returns `() => Promise<any>` — a function you call to open the portal.

```vue
<script lang="ts" setup>
import { usePortal } from 'promise-portal-vue2'
import FormModal from './FormModal.vue'

const openForm = usePortal(FormModal, {})

async function handleOpen() {
  try {
    const data = await openForm()
    console.log('form data:', data)
  }
  catch (reason) {
    console.log('cancelled:', reason)
  }
}
</script>
```

> **Note:** Must be called inside `setup()` or `<script setup>`. Throws otherwise.

### `usePortalContext()`

Access the portal's `$resolve`, `$reject`, and `$show` properties from within a portal component's `setup()`.

Returns `{ $resolve, $reject, $show }`.

```vue
<!-- Inside a portal component -->
<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import { usePortalContext } from 'promise-portal-vue2'

const instance = getCurrentInstance()
const { $resolve } = usePortalContext()

const formData = ref({ name: '', email: '' })

function submit() {
  $resolve({ ...formData.value })
}
</script>

<template>
  <a-modal :visible="$show" title="Form" @ok="submit" @cancel="$reject('cancelled')">
    <input v-model="formData.name" />
    <input v-model="formData.email" />
  </a-modal>
</template>
```

> **Note:** Must be called inside `setup()` or `<script setup>`.

## Examples

See the playground for complete, runnable examples covering different component declaration styles:

| Style | Description |
|-------|-------------|
| `Vue.extend()` | Options API component (classic Vue 2) |
| `defineComponent()` | Options API with full TypeScript support |
| Plain object | Simplest: `export default { ... }` |
| `<script setup>` | Composition API (Vue 2.7+) |

```bash
pnpm dev
# open http://localhost:9002
```

## How It Works

```
definePortal(Comp, props, this)
  │
  ├─ Vue.extend(Comp)              → component constructor
  ├─ new A({ parent, propsData })   → component instance
  ├─ inject $resolve / $reject / $show
  ├─ $mount() + append to <body>
  ├─ $show = true                    → dialog opens
  │
  │  ... user interacts ...
  │
  ├─ $resolve(value) ──────────────→ Promise resolves
  │  or $reject(reason) ───────────→ Promise rejects
  │
  └─ cleanup:
       $show = false
       wait 300ms (exit animation)
       $destroy() + $el.remove()
```

## License

MIT
