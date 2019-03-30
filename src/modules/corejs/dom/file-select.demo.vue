<template>
  <div>
    <button @click="fileSelect">文件选择</button>
    <button @click="camera">拍照</button>
    <img :src="src" alt="">
  </div>
</template>

<script>
import fileSelect from '@/modules/corejs/dom/file-select.js'
export default {
  data () {
    return {
      src: ''
    }
  },
  methods: {
    async fileSelect () {
      console.log(123)
      let file = await fileSelect.file({
        // 图片文件。默认所有
        // 更多类型请看：
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
        accept: 'image/*' // 图片文件
      })
      console.log(file)
      this.src = await fileSelect.fileReadAsDataURL(file)
      console.log('成功')
    },
    // 多文件，待实现
    // async filesSelect () {
    //   let files = await fileSelect.files() // 多文件
    // },
    async camera () {
      let file = await fileSelect.camera()
      console.log(file)
    }
  }
}
</script>
