<template>
  <div class="container">
    <button @click="imgSelect">选择截图</button>
    <ZoomMouseDemo />
    <!-- <ImageCropPC
      :show="true"
      :url="url"
    /> -->
  </div>
</template>

<script>
import fileSelect from '@/utils/corejs/file/file-select.js'
import ImageCropPC from './ImageCropPC'
import ZoomMouseDemo from './ZoomMouse.demo'

export default {
  components: {
    ZoomMouseDemo,
    ImageCropPC
  },
  data () {
    return {
      url: require('@/components/image-crop/1.jpg').default
    }
  },
  methods: {
    async imgSelect () {
      const dataURL = URL.createObjectURL(await fileSelect.file())
      console.log(dataURL)
    }
  }
}
</script>

<style scoped>
.container {
  width: 1000px;
  height: 600px;
  border: 2px solid #ddd;
  position: relative;
  overflow: hidden;
}
</style>
