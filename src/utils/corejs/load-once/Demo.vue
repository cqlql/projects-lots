<template>
  <div>
    <button @click="excu">快速点击多次看 network 是否多次重复加载 </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import LoadOnce from '@/utils/corejs/load-once'
import scriptLoad from '@/utils/corejs/load/script-load'
const ckeditorLoadOnce = new LoadOnce()

@Component
export default class LoadOnce2Demo extends Vue {
  count = 0
  async excu () {
    const id = ++this.count
    const ckeditor = await ckeditorLoadOnce.load(async () => {
      await scriptLoad('https://style.shenduxuetang.com/ckeditor/4.11.1/ckeditor.js')
      await scriptLoad('https://style.shenduxuetang.com/ckeditor/4.11.1/config.js')
      return window.CKEDITOR
    })
    console.log(id, ckeditor)
  }
}
</script>
