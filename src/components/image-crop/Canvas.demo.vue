<template>
  <div>
    <p>
      <input v-model="angle" type="number">
    </p>
    <canvas ref="eCanvas" class="cvs" />
    <img ref="eImg" :src="url" alt="" @load="load">
  </div>
</template>

<script>
export default {
  data () {
    return {
      angle: 0,
      url: 'https://img13.360buyimg.com/n1/s350x449_jfs/t18994/37/1125997630/238618/15b9a7d/5abc8fccN013d0d0a.jpg!cc_350x449.jpg'
    }
  },
  computed: {
    ctx () {
      return this.eCanvas.getContext('2d')
    },
    eCanvas () {
      return this.$refs.eCanvas
    },
    eImg () {
      return this.$refs.eImg
    }
  },
  mounted () {
  },
  methods: {
    load (e) {
      let { eImg, eCanvas, ctx } = this
      let w = eCanvas.width = eImg.width
      let h = eCanvas.height = eImg.height
      let cx = w / 2
      let cy = h / 2
      
      // ctx.translate(0, h)
      // ctx.rotate(-90 * Math.PI / 180)
      ctx.drawImage(eImg, 50, 50, w, h, 0, 0, w, h)
      // ctx.drawImage(eImg, 10, 0, w, h, 0, 0, w, h)
      
      // ctx.fillStyle = '#fff'
      // ctx.font = '22px Microsoft Yahei'
      // ctx.fillText('canvas', 22, 22)
    },
    rotate () {
      let { eImg, eCanvas, ctx } = this
      ctx.clearRect(0, 0, eCanvas.width, eCanvas.height)
      // ctx.translate(eCanvas.width, 0)
      ctx.rotate(Math.PI / 180 * this.angle)
      ctx.drawImage(eImg, 0, 0)
      ctx.fill()
    }
  },
  watch: {
    angle () {
      this.rotate()
    }
  }
}
</script>

<style>
.cvs {
  border: 2px solid #ddd;
}
</style>
