<template>
  <div></div>
</template>

<script>
import loadOnce from './index.js'
export default {
  mounted () {
    loadOnce([
      './ckeditor5-build-classic/ckeditor.js',
      './ckeditor5-build-classic/translations/zh-cn.js'
    ]).then(() => {
      console.log(ClassicEditor)
    })
  }
}
</script>

