import type { ComponentPublicInstance, CreateComponentPublicInstance, DefineComponent, VueConstructor } from 'vue'
import Vue, { getCurrentInstance } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $resolve: (value?: any) => void
    $reject: (reason?: any) => void
    $show: boolean
  }
}

type AnyComponent = VueConstructor | DefineComponent<any, any, any, any, any>

type Parent = CreateComponentPublicInstance | ComponentPublicInstance | Vue

export const definePortal = (component: AnyComponent, props: Record<string, any>, parent: Parent) => {
  let modalInstance: any = null
  let reject: any = null
  let isClosing = false

  const cleanup = () => {
    if (isClosing || !modalInstance) {
      return
    }
    isClosing = true
    modalInstance.$show = false
    setTimeout(() => {
      modalInstance.$destroy()
      modalInstance.$el.remove()
    }, 300)
  }
  const onParentDestroyed = () => {
    cleanup()
    reject(new Error('REASON_PARENT_DESTROYED'))
  }

  return new Promise(($resolve: (value?: any) => void, $reject: (reason?: any) => void) => {
    reject = $reject
    const A = Vue.extend(component)
    modalInstance = new A({
      parent: parent as Vue,
      propsData: props,
    })
    modalInstance.$resolve = $resolve
    modalInstance.$reject = $reject

    ;(Vue.util as any).defineReactive(modalInstance, '$show', false)
    modalInstance.$mount()
    document.body.appendChild(modalInstance.$el)
    modalInstance.$show = true

    parent.$once('hook:beforeDestroy', onParentDestroyed)
  }).finally(() => {
    parent.$off('hook:beforeDestroy', onParentDestroyed)
    cleanup()
  })
}

export function usePortal(component: AnyComponent, props: Record<string, any> = {}) {
  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error('usePortal() must be called inside setup()')
  }

  const parent = instance.proxy

  return () => {
    return definePortal(component, props, parent)
  }
}

export * from './detector'
