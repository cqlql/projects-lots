<template>
  <div>
    <button @click="showImageCrop">弹出截图</button>
    <ImageCrop
      v-model="options.show"
      :url="options.url"
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
        show: true
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
    }
  }
}
</script>
