<template>
  <div>
    <button @click="imgSelect">选择截图</button>
    <ImageCropPC />
  </div>
</template>

<script>
import fileSelect from '@/utils/corejs/file/file-select.js'
import ImageCropPC from './ImageCropPC'
export default {
  components: { ImageCropPC },
  methods: {
    async imgSelect () {
      let dataURL = URL.createObjectURL(await fileSelect.file())
      console.log(dataURL)
    }
  }
}
</script>
