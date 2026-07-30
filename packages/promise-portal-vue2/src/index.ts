import type { DefineComponent, VueConstructor } from 'vue'
import Vue from 'vue'

type AnyComponent = VueConstructor | DefineComponent<any, any, any, any, any>

export const definePortal = (component: AnyComponent, props: Record<string, any>, parent: Vue) => {
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
    modalInstance = new (Vue.extend(component))({
      parent,
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

export * from './detector'
