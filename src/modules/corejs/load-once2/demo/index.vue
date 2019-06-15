<template>
  <div>
    <button @click="excu">执行加载，快速点击多次看效果</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import LoadOnce from '../index'
import scriptLoad from '../../dom/script-load'
let ckeditorLoadOnce = new LoadOnce()

declare global {
  interface Window {
    CKEDITOR: any;
  }
}

@Component
export default class LoadOnce2Demo extends Vue {
  count = 0
  excu () {
    let id = ++this.count
    ckeditorLoadOnce.load(async () => {
      await scriptLoad('http://style.shenduxuetang.com/ckeditor/4.11.1/ckeditor.js')
      await scriptLoad('http://style.shenduxuetang.com/ckeditor/4.11.1/config.js')
      return window.CKEDITOR
    }).then(ckeditor => {
      console.log(id, ckeditor)
    })
  }
}
</script>
