import type { Ref } from 'vue'

export interface Scope<R> {
  resolve: (value: R | PromiseLike<R>) => void
  reject: (reason?: any) => void
  target: HTMLElement
  el: HTMLDivElement
  vnode: any
  unmountDelay: Ref<number>
  show: Ref<boolean>
}

export const SCOPE_KEY = Symbol('promise-portal-scope')
