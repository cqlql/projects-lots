<template>
  <div>
    <button>执行加载</button>
  </div>
</template>

<script>
import LoadOnce from '../index.js'
import scriptLoad from '../../dom/script-load'

let ckeditorLoadOnce = new LoadOnce()
export default {
  mounted () {
    ckeditorLoadOnce.load(async () => {
      await scriptLoad('./ckeditor5-build-classic/ckeditor.js')
      await scriptLoad('./ckeditor5-build-classic/translations/zh-cn.js')
      return ckeditor
    }).then(ckeditor => {
      console.log(ckeditor)
    })
  }
}
</script>
