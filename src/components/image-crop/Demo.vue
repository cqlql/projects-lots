<template>
  <div>
    <button @click="showImageCrop">弹出截图</button>
    <button style="position: relative;z-index: 1;" @click="changeUrl">换图片测试</button>
    <ImageCrop
      v-model="options.show"
      :url="options.url"
      :aspect-ratio="options.aspectRatio"
      @confirm="confirm"
    />
  </div>
</template>
<script>
import ImageCrop from '@/components/image-crop/ImageCrop.vue'
import url from './1.jpg'
export default {
  components: {
    ImageCrop
  },
  data () {
    return {
      options: {
        url,
        show: true,
        aspectRatio: 16 / 9
      }
    }
  },
  methods: {
    confirm (blob) {
      console.log(blob)
      location.href = URL.createObjectURL(blob)
    },
    showImageCrop () {
      this.options.show = true
    },
    changeUrl () {
      this.options.url = 'http://placehold.it/300x100'
    }
  }
}
</script>
