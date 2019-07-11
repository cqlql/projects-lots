import Vue, { PluginFunction } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $loading: any
  }
}

declare const LoadingPlugin: PluginFunction<Vue>
export default LoadingPlugin
