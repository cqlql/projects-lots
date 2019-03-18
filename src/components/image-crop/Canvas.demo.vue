<template>
  <div>
    <p>
      <!-- <input v-model="angle" type="number"> -->
      <!-- <button @click="rotate">旋转</button> -->
      <button @click="crop">旋转 + 裁剪</button>
    </p>
    <div ref="eBox" class="box" />
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
    },
    eBox () {
      return this.$refs.eBox
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
    imgLoad (url) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = function () {
          resolve(img)
        }
        img.onerror = function (err) {
          reject(err)
        }
        img.src = url
      })
    },
    getTestParams () {
      let params = { 'url': 'https://img13.360buyimg.com/n1/s350x449_jfs/t18994/37/1125997630/238618/15b9a7d/5abc8fccN013d0d0a.jpg!cc_350x449.jpg', 'x': -49.49999999999997, 'y': 0, 'w': 449, 'h': 350, 'angle': -90, 'width': 350, 'height': 449, 'selectRectWdith': 350, 'selectRectHeight': 350 }

      // params = { 'url': 'https://img13.360buyimg.com/n1/s350x449_jfs/t18994/37/1125997630/238618/15b9a7d/5abc8fccN013d0d0a.jpg!cc_350x449.jpg', 'x': 0, 'y': -49.50000000000004, 'w': 350, 'h': 449, 'angle': -180, 'width': 350, 'height': 449, 'selectRectWdith': 350, 'selectRectHeight': 350 }

      // params = { 'url': 'https://img13.360buyimg.com/n1/s350x449_jfs/t18994/37/1125997630/238618/15b9a7d/5abc8fccN013d0d0a.jpg!cc_350x449.jpg', 'x': -49.50000000000004, 'y': 0, 'w': 449, 'h': 350, 'angle': -270, 'width': 350, 'height': 449, 'selectRectWdith': 350, 'selectRectHeight': 350 }

      params = {"url":"https://img13.360buyimg.com/n1/s350x449_jfs/t18994/37/1125997630/238618/15b9a7d/5abc8fccN013d0d0a.jpg!cc_350x449.jpg","x":0,"y":0,"w":350,"h":449,"angle":0,"width":350,"height":449,"selectRectWdith":350,"selectRectHeight":350}
      return params
    },
    async crop () {
      let params = this.getTestParams()
      let { x, y, selectRectWdith, selectRectHeight } = params

      let rImg = await this.rotateCanvas(params)

      let cvs = document.createElement('canvas')
      cvs.className = 'cvs' // test
      let ctx = cvs.getContext('2d')
      cvs.width = selectRectWdith
      cvs.height = selectRectHeight
      ctx.drawImage(rImg, x, y)

      // test
      let el = document.createElement('p')
      el.innerHTML = '裁剪后：'
      this.eBox.appendChild(el)
      this.eBox.appendChild(cvs)
    },

    async rotateCanvas (params) {
      let { angle, url } = params
      let eImg = await this.imgLoad(url)
      if (!angle) return eImg // 没有旋转直接返回 img
      
      let { w, h } = params
      let cvs = document.createElement('canvas')
      cvs.className = 'cvs' // test
      let ctx = cvs.getContext('2d')
      cvs.width = w
      cvs.height = h

      switch (angle) {
        case -90:
          ctx.translate(0, h)
          break
        case -180:
          ctx.translate(w, h)
          break
        case -270:
          ctx.translate(w, 0)
          break
      }
      ctx.rotate(angle * Math.PI / 180)
      ctx.drawImage(eImg, 0, 0)

      // test
      let el = document.createElement('p')
      el.innerHTML = '旋转后：'
      this.eBox.appendChild(el)
      this.eBox.appendChild(cvs)

      return cvs
    }
  }
}
</script>

<style>
.cvs {
  border: 2px solid #ddd;
}
</style>
