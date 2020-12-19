<template>
  <div>
    <!-- <button @click="showImageCrop">弹出截图</button> -->
    <!-- <p>
      <button style="position: relative;z-index: 1;" @click="changeUrl">换图片测试</button>
    </p> -->
    <p>
      <button @click="imgSelect">选择截图</button>
    </p>
    <p>
      <button @click="camera">拍照截图</button>
    </p>
    <ImageCrop
      :show.sync="options.show"
      :url.sync="options.url"
      :aspect-ratio="options.aspectRatio"
      :data-type="options.dataType"
      :size-limit="options.sizeLimit"
      @confirm="confirm"
    />
    <img v-if="cropImgUrl" :src="cropImgUrl" alt="裁剪后的图片" @load="w = $event.target.width;h = $event.target.height">
  </div>
</template>
<script>
import ImageCrop from '@/components/image-crop/ImageCrop.vue'
// import url from './1.jpg'
// import qiniup from '@/js/file-upload-qiniu.js'
import fileSelect from '@/libs/corejs/file/file-select.js'
export default {
  components: {
    ImageCrop
  },
  data () {
    return {
      w: 0,
      h: 0,
      cropImgUrl: '',
      options: {
        url: '',
        show: false,
        // 裁剪后最终图片尺寸
        size: {
          width: 200,
          height: 100
        },
        sizeLimit: 1980, // 最大高宽，原图尺寸限制压缩，避免原图太大造成浏览器渲染慢
        dataType: 'blob', // 'blob'(默认值) 'base64' 'param',
        aspectRatio: 16 / 9
      }
    }
  },
  methods: {
    async imgSelect () {
      // let dataURL = await fileSelect.fileReadAsDataURL(await fileSelect.file())
      let dataURL = URL.createObjectURL(await fileSelect.file())
      let { options } = this
      options.show = true
      options.url = dataURL
    },
    async camera () {
      // let dataURL = await fileSelect.fileReadAsDataURL(await fileSelect.camera())
      let dataURL = URL.createObjectURL(await fileSelect.camera())
      let { options } = this
      options.url = dataURL
      options.show = true
    },
    async confirm (blob) { // blob 可直接上传
      // this.cropImgUrl = await qiniup(blob)
      this.cropImgUrl = URL.createObjectURL(blob)
      this.$toast.success('裁剪成功')
      this.options.show = false
    },
    // confirm (param) {
    //   console.log(param)
    // },
    // confirm (base64) {
    //   let img = new Image()
    //   img.src = base64
    //   document.body.appendChild(img)
    //   this.options.show = false
    // },
    showImageCrop () {
      this.options.show = true
    },
    changeUrl () {
      this.options.url = 'http://placehold.it/300x100'
      // 换 url 后需手动 restart
      // 没有同时 wacth url 和 show 是为了避免同时改变 url，show 时触发两次 restart
      this.$refs.vImageCrop.restart()
    }
  }
}
</script>

<style scoped>
p {
  margin: 20px;
}
button {
  font-size: 20px;
}
</style>
