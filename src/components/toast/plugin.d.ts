import Vue, { PluginFunction } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $toast: any
  }
}

declare const ToastPlugin: PluginFunction<Vue>
export default ToastPlugin
