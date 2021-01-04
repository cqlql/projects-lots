<template>
  <Transition
    :enter-class="$style.slideEnter"
    :leave-to-class="$style.slideEnter"
    :enter-active-class="$style.slideActive"
    :leave-active-class="$style.slideActive"
  >
    <div v-if="show" :class="$style.imageCrop">
      <div :class="$style.selectArea">
        <div
          :class="$style.slecteBox"
          :style="{
            left: slecteBoxStyle.x + 'px',
            top: slecteBoxStyle.y + 'px',
            width: slecteBoxStyle.w + 'px',
            height: slecteBoxStyle.h + 'px',
          }"
        >
          <div
            ref="eImgBox"
            :class="$style.imgBox"
            :style="{
              width: imgBoxStyle.w + 'px',
              height: imgBoxStyle.h + 'px',
              [transformName]: `translate(${imgBoxStyleReal.x}px,${imgBoxStyleReal.y}px) scale(${imgBoxStyle.scale}) rotate(${imgBoxStyle.rotate}deg)`,
              [transformOriginName]: `${imgBoxStyle.originX}% ${imgBoxStyle.originY}%`
            }"
          >
            <img
              :src="url"
              :style="{
                width: imgStyle.w + 'px',
                height: imgStyle.h + 'px',
                [transformName]: `translate(${imgStyle.x}px,${imgStyle.y}px) rotate(${imgStyle.rotate}deg)`
              }"
            >
          </div>
          <div
            v-for="(v, i) of 8"
            :key="v"
            :class="$style.mask"
            :style="maskStyle[i]"
          />
          <div :class="$style.boxShadow" />
        </div>
      </div>
      <div :class="$style.bottomBar">
        <a :class="$style.rotate" @click="rotate"><RotateIco :class="$style.rotateIco" /></a>
        <a @click="$emit('update:show', false)">取消</a>
        <a @click="restore">还原</a>
        <a @click="confirm">完成</a>
      </div>
    </div>
  </Transition>
</template>

<script>
import imgSize from '@/utils/corejs/img/img-size-complete.js'
import center from '@/utils/corejs/center/center.js'
import fullCenter from '@/utils/corejs/center/full-center.js'
import autoprefix from '@/utils/corejs/css/autoprefix'
import ZoomMouse from './zoom-mouse'
import transitionendOnce from '@/utils/corejs/animation/transitionend-once'
import RotateIco from '../image-crop/RotateIco'

export default {
  components: {
    RotateIco
  },
  // model: {
  //   prop: 'show',
  //   event: 'cancel'
  // },
  props: {
    dataType: {
      type: String,
      default: 'blob'
    },
    show: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    // 选择框 宽/高 比
    aspectRatio: {
      type: Number,
      default: 1 // 16 / 9
    },
    sizeLimit: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      bottomOptionsShowB: false,
      // aspectRatio: 16 / 9, // 选择框 宽/高 比
      // aspectRatio: 1, // 选择框 宽/高 比
      selectAreaStyleWidth: 500,
      selectAreaStyleHeight: 500,
      slecteBoxStyle: {
        h: 0,
        w: 0,
        x: 0,
        y: 0
      },
      // url: 'https://img13.360buyimg.com/n1/s350x449_jfs/t18994/37/1125997630/238618/15b9a7d/5abc8fccN013d0d0a.jpg!cc_350x449.jpg',
      imgBoxStyle: {
        // 原始高宽(不会变，变的是scale)，真实坐标(不会因 origin 改变)
        w: 300,
        h: 100,
        x: 0,
        y: 0,

        scale: 1,
        rotate: 0,
        originX: 0,
        originY: 0,

        // 限制
        minScale: 1,
        minX: 0,
        minY: 0,
        // minWidth: 1,
        // minHeight: 1,
        maxX: 0,
        maxY: 0
      },
      imgStyle: {
        w: 300,
        h: 100,
        x: 0,
        y: 0,
        rotate: 0
      },
      isRun: false, // 动画是否进行中
      // rotateDirection: -90, // 旋转方向，逆时针
      transformName: autoprefix('transform'),
      transformOriginName: autoprefix('transform-origin'),
      maskStyle: []
    }
  },
  computed: {
    // 真实高宽(放大后的实际高宽)， 实际坐标(会因 origin 改变)
    imgBoxStyleReal () {
      const { imgBoxStyle } = this
      const { w, h, x, y, scale, originX, originY } = imgBoxStyle
      const rw = w * scale
      const rh = h * scale
      return {
        w: rw,
        h: rh,
        x: x + originX / 100 * (scale - 1) * w,
        y: y + originY / 100 * (scale - 1) * h
      }
    }
  },
  watch: {
    show () {
      this.restart()
    }
  },
  mounted () {
    this.restart()
  },
  methods: {
    async restart () {
      if (!this.show) return
      this.sizeUpdate()
      this.slecteBoxStyleUpdate()
      await this.imgSizeUpdate()
      let zoomBehavior = this.zoomBehavior
      const { imgBoxStyle } = this
      if (zoomBehavior) zoomBehavior.destroy()
      zoomBehavior = this.zoomBehavior = new ZoomMouse({
        elem: this.$refs.eImgBox
      })
      zoomBehavior.css = function () {
        const { x, y, scale } = this
        imgBoxStyle.x = x
        imgBoxStyle.y = y
        imgBoxStyle.scale = scale
      }
      zoomBehavior.onDown = e => {
        return this.isRun !== true
      }
      zoomBehavior.onEnd = () => {
        let isChange = false
        const { imgBoxStyle } = this
        const { minScale } = imgBoxStyle
        if (zoomBehavior.scale < minScale) {
          imgBoxStyle.scale = zoomBehavior.scale = minScale
          isChange = true
        }
        this.minXyUpdate()
        const { x, y, minX, minY } = imgBoxStyle

        if (x < minX) {
          imgBoxStyle.x = zoomBehavior.x = minX
          isChange = true
        }
        if (y < minY) {
          imgBoxStyle.y = zoomBehavior.y = minY
          isChange = true
        }
        if (x > 0) {
          imgBoxStyle.x = zoomBehavior.x = 0
          isChange = true
        }
        if (y > 0) {
          imgBoxStyle.y = zoomBehavior.y = 0
          isChange = true
        }
        if (isChange) {
          this.isRun = true
          this.transitionStart()
        }
      }
      this.restore()
      this.minScaleUpdate()
      this.buildMask()
    },
    async confirm () {
      const { imgStyle, imgBoxStyle, slecteBoxStyle } = this
      const { scale } = imgBoxStyle
      const cropParams = {
        url: this.url,
        // 旋转后的高宽坐标
        x: imgBoxStyle.x / scale,
        y: imgBoxStyle.y / scale,
        w: imgBoxStyle.w,
        h: imgBoxStyle.h,
        // 旋转角度
        angle: imgStyle.rotate % 360,
        // 图片原始高宽，未旋转前
        width: imgStyle.w,
        height: imgStyle.h,
        // 选择框高宽
        selectRectWdith: slecteBoxStyle.w / scale,
        selectRectHeight: slecteBoxStyle.h / scale
      }
      let data = cropParams
      let cvs
      switch (this.dataType) {
        case 'blob':
          cvs = await this.crop(cropParams)
          data = await new Promise(resolve => {
            cvs.toBlob(blob => { resolve(blob) }, 'image/jpeg', 0.7)
          })
          break
        case 'base64':
          cvs = await this.crop(cropParams)
          data = cvs.toDataURL('image/jpeg', 0.7)
          break
      }
      this.$emit('confirm', data)
    },
    // 窗口尺寸更新
    sizeUpdate () {
      // let slecteBoxBorderWidth = 0 // 选择框边框宽
      const margin = 20 // selectArea 间距
      const { w, h } = this.getWindowSize()
      this.selectAreaStyleWidth = w - margin // - slecteBoxBorderWidth
      this.selectAreaStyleHeight = h - 60 - margin // - slecteBoxBorderWidth
    },
    getWindowSize () {
      const el = this.$el.parentElement
      return {
        w: el.clientWidth,
        h: el.clientHeight
      }
      // 移动端以浏览器显示区域作为容器
      // return {
      //   w: window.innerWidth,
      //   h: window.innerHeight
      // }
    },
    // 选择框尺寸坐标更新
    slecteBoxStyleUpdate () {
      const { slecteBoxStyle, selectAreaStyleWidth, selectAreaStyleHeight } = this
      const { x, y, w, h } = center(selectAreaStyleWidth, selectAreaStyleHeight, selectAreaStyleWidth, selectAreaStyleWidth / this.aspectRatio)
      slecteBoxStyle.x = x
      slecteBoxStyle.y = y
      slecteBoxStyle.w = w
      slecteBoxStyle.h = h
    },
    // 图片尺寸更新
    async imgSizeUpdate () {
      const { imgBoxStyle, imgStyle } = this
      let size
      try {
        size = await imgSize(this.url)
        if (this.sizeLimit || size.rotate) { // 压缩 或者 修正旋转
          await this.imageSizeCompress(size)
        }
        imgStyle.w = imgBoxStyle.w = size.width
        imgStyle.h = imgBoxStyle.h = size.height
      } catch (err) {
        console.error('图片尺寸获取失败', err)
      }
    },
    // 限制更新
    minXyUpdate () {
      const { slecteBoxStyle, imgBoxStyle, imgBoxStyleReal } = this
      imgBoxStyle.minX = slecteBoxStyle.w - imgBoxStyleReal.w
      imgBoxStyle.minY = slecteBoxStyle.h - imgBoxStyleReal.h
    },
    minScaleUpdate () {
      const { slecteBoxStyle, imgBoxStyle } = this
      const { w } = fullCenter(slecteBoxStyle.w, slecteBoxStyle.h, imgBoxStyle.w, imgBoxStyle.h)
      imgBoxStyle.minScale = w / imgBoxStyle.w
    },
    // 居中
    toCenter () {
      const { slecteBoxStyle, imgBoxStyle, zoomBehavior } = this
      const { x, y, w } = fullCenter(slecteBoxStyle.w, slecteBoxStyle.h, imgBoxStyle.w, imgBoxStyle.h)
      const scale = w / imgBoxStyle.w
      zoomBehavior.x = imgBoxStyle.x = x
      zoomBehavior.y = imgBoxStyle.y = y
      zoomBehavior.scale = imgBoxStyle.scale = scale
    },
    // 还原
    restore () {
      const { imgBoxStyle, imgStyle } = this
      imgBoxStyle.w = imgStyle.w
      imgBoxStyle.h = imgStyle.h
      imgStyle.x = imgStyle.y = imgStyle.rotate = 0

      this.toCenter()
    },
    rotate () {
      if (this.isRun) return
      this.isRun = true
      const { slecteBoxStyle, imgBoxStyle, imgBoxStyleReal } = this
      const cx = slecteBoxStyle.w / 2
      const cy = slecteBoxStyle.h / 2
      imgBoxStyle.originX = (cx - imgBoxStyle.x) / imgBoxStyleReal.w * 100
      imgBoxStyle.originY = (cy - imgBoxStyle.y) / imgBoxStyleReal.h * 100

      setTimeout(() => {
        imgBoxStyle.rotate = -90
        this.transitionStart(() => {
          // 更正。box 旋转恢复，改为旋转 img
          this.rotateCorrect()
          // 更新 minScale
          this.minScaleUpdate()

          setTimeout(() => {
            this.zoomBehavior.onEnd()
          }, 1)
        })
      }, 10)
    },
    transitionStart (end = () => {}) {
      const el = this.$refs.eImgBox
      const active = this.$style.transitionActive
      const { classList } = el

      classList.add(active)
      transitionendOnce(el, () => {
        this.isRun = false
        classList.remove(active)
        end()
      })
      // start()
    },
    rotateCorrect () {
      const { imgBoxStyle, imgStyle, slecteBoxStyle, zoomBehavior } = this
      const { w, x, y } = imgBoxStyle
      imgBoxStyle.w = imgBoxStyle.h
      imgBoxStyle.h = w
      imgBoxStyle.rotate = 0
      imgBoxStyle.originX = imgBoxStyle.originY = 0
      imgStyle.rotate = imgStyle.rotate - 90

      // 更正坐标
      const { h: rh } = this.imgBoxStyleReal
      const cx = slecteBoxStyle.w / 2
      const cy = slecteBoxStyle.h / 2
      zoomBehavior.x = imgBoxStyle.x = cx - cy + y
      zoomBehavior.y = imgBoxStyle.y = cy - (rh - cx + x)

      this.rotateCorrectImgCenter()
    },
    rotateCorrectImgCenter () {
      const { imgBoxStyle, imgStyle } = this
      const { w, h } = imgBoxStyle
      const { w: imgw, h: imgh } = imgStyle
      imgStyle.x = (w - imgw) / 2
      imgStyle.y = (h - imgh) / 2
    },
    imgLoad (url) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = function () {
          resolve(img)
        }
        img.onerror = function (err) {
          reject(err)
        }
        img.src = url
      })
    },
    async crop (params) {
      const { x, y, selectRectWdith, selectRectHeight } = params

      const rImg = await this.rotateCanvas(params)

      const cvs = document.createElement('canvas')
      const ctx = cvs.getContext('2d')
      cvs.width = selectRectWdith
      cvs.height = selectRectHeight
      ctx.drawImage(rImg, x, y)
      return cvs
    },
    async rotateCanvas (params) {
      const { angle, url } = params
      const eImg = await this.imgLoad(url)
      if (!angle) return eImg // 没有旋转直接返回 img

      const { w, h } = params
      const cvs = document.createElement('canvas')
      const ctx = cvs.getContext('2d')
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
      return cvs
    },
    buildMask () {
      const { slecteBoxStyle } = this
      const { w: selectRectWdith, h: selectRectHeight } = slecteBoxStyle
      const w = window.innerWidth / 2
      const h = window.innerHeight / 2

      this.maskStyle = [
        {
          width: w + 'px',
          left: -w + 'px'
        },
        {
          width: w + 'px',
          height: h + 'px',
          left: -w + 'px',
          top: -h + 'px'
        },
        {
          height: h + 'px',
          top: -h + 'px'
        },
        {
          width: w + 'px',
          height: h + 'px',
          left: selectRectWdith + 'px',
          top: -h + 'px'
        },
        {
          width: w + 'px',
          left: selectRectWdith + 'px'
        },
        {
          width: w + 'px',
          height: h + 'px',
          left: selectRectWdith + 'px',
          top: selectRectHeight + 'px'
        },
        {
          height: h + 'px',
          top: selectRectHeight + 'px'
        },
        {
          width: w + 'px',
          height: h + 'px',
          left: -w + 'px',
          top: selectRectHeight + 'px'
        }
      ]
    },
    // 图片尺寸限制+压缩
    async imageSizeCompress (imgSize) {
      const { sizeLimit } = this

      let toCorrect = false
      let { width, height } = imgSize
      const ratio = width / height
      if (ratio > 1 && width > sizeLimit) { // 图片宽大于高
        width = sizeLimit
        height = width / ratio
        toCorrect = true
      } else if (height > sizeLimit) { // 图片高大于宽
        height = sizeLimit
        width = height * ratio
        toCorrect = true
      }

      if (imgSize.rotate) {
        const temp = width
        width = imgSize.width = height
        height = imgSize.height = temp
        toCorrect = true
      } else {
        imgSize.width = width
        imgSize.height = height
      }

      // 使用canvas 压缩成指定尺寸，或者修正拍照旋转变形问题，并重新赋值 this.url
      if (toCorrect) {
        const cvs = document.createElement('canvas')
        const eImg = await this.imgLoad(this.url)
        const ctx = cvs.getContext('2d')
        cvs.width = width
        cvs.height = height
        ctx.drawImage(eImg, 0, 0, width, height)
        const newUrl = await new Promise(resolve => {
          cvs.toBlob(blob => {
            resolve(URL.createObjectURL(blob))
          }, 'image/jpeg', 1)
        })
        this.$emit('update:url', newUrl)
      }
    }
  }
}
</script>

<style module>
.imageCrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
  background-color: #fff;
}
.selectArea {
  margin: 10px;
}
.slecteBox {
  /* border: 2px solid #333; */
  position: relative;
}
.imgBox {
  /* transform-origin: 0 0; */
}

.transitionActive {
  transition: 0.3s ease;
}

.mask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
}
.boxShadow {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: inset 0 0 6px 1px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  outline: 2px solid #fff;
}
.bottomBar {
  width: 100%;
  /* height: 60px; */
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  text-align: center;
  padding: 20px;
  a {
    margin: 0 10px;
    color: #fff;

  }
}
.rotateIco{
  width: 18px;
  height: 18px;
  vertical-align: -2px;
  /* color: #fff; */
  display: inline-block;
}
.slideActive{
  transition: 0.3s cubic-bezier(.55,0,.1,1);
  transition-property:opacity,transform;
}
.slideEnter{
  opacity: 0;
  transform: translate3d(30px, 0, 0);
}
</style>
