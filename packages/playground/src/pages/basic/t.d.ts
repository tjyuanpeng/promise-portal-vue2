// import { ComponentCustomProperties } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $resolve: (value?: any) => void
    $reject: (reason?: any) => void
    $show: boolean
  }
}

export {}
