<template>
  <div>
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
            [transformName]: `translate(${imgBoxStyle.x}px,${imgBoxStyle.y}px) scale(${imgBoxStyle.scale}) rotate(${imgBoxStyle.rotate}deg)`
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
      </div>
    </div>
    <div :class="$style.bottomBar">
      <button>取消</button>
      <button>还原</button>
      <button>完成</button>
    </div>
  </div>
</template>

<script>
import imgSize from '@/modules/corejs/dom/img-size-complete.js'
import center from '@/modules/corejs/center/center.js'
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
import ZoomTouch from '@/modules/zoom-touch2/zoom-touch.js'
export default {
  data () {
    return {
      aspectRatio: 16 / 9, // 选择框 宽/高 比
      selectAreaStyleWidth: 500,
      selectAreaStyleHeight: 500,
      slecteBoxStyle: {
        h: 0,
        w: 0,
        x: 0,
        y: 0
      },
      url: 'https://img13.360buyimg.com/n1/s350x449_jfs/t18994/37/1125997630/238618/15b9a7d/5abc8fccN013d0d0a.jpg!cc_350x449.jpg',
      imgBoxStyle: {
        w: 300,
        h: 100,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0
      },
      imgStyle: {
        w: 300,
        h: 100,
        x: 0,
        y: 0,
        rotate: 0
      },
      transformName: autoprefix('transform'),
    }
  },
  created () {
    this.sizeUpdate()
    this.slecteBoxStyleUpdate()
    this.imgSizeUpdate()
  },
  mounted () {
    let { imgBoxStyle } = this
    let zoomTouch = new ZoomTouch(this.$refs.eImgBox)
    zoomTouch.css = function () {
      let { x, y, scale } = this
      imgBoxStyle.x = x
      imgBoxStyle.y = y
      imgBoxStyle.scale = scale
    }
  },
  methods: {
    // 窗口尺寸更新
    sizeUpdate () {
      let slecteBoxBorderWidth = 4 // 选择框边框宽
      let margin = 20 // selectArea 间距
      this.selectAreaStyleWidth = window.innerWidth - slecteBoxBorderWidth - margin
      this.selectAreaStyleHeight = window.innerHeight - 100 - slecteBoxBorderWidth - margin
    },
    // 选择框尺寸坐标更新
    slecteBoxStyleUpdate () {
      let { slecteBoxStyle, selectAreaStyleWidth, selectAreaStyleHeight } = this
      let { x, y, w, h } = center(selectAreaStyleWidth, selectAreaStyleHeight, selectAreaStyleWidth, selectAreaStyleWidth / this.aspectRatio)
      slecteBoxStyle.x = x
      slecteBoxStyle.y = y
      slecteBoxStyle.w = w
      slecteBoxStyle.h = h
    },
    // 图片尺寸更新
    async imgSizeUpdate () {
      let { imgBoxStyle, imgStyle } = this
      let img
      try {
        img = await imgSize(this.url)
        imgStyle.w = imgBoxStyle.w = img.width
        imgStyle.h = imgBoxStyle.h = img.height
        console.log(imgStyle)
      } catch (err) {
        console.error('图片尺寸获取失败', err)
      }
    }
  }
}
</script>

<style module>
.selectArea {
  margin: 10px;
}
.slecteBox {
  border: 2px solid #333;
  position: relative;
}
.imgBox {
  /* transform-origin: 0 0; */
}
.bottomBar {
  width: 100%;
  height: 100px;
  background-color: #ddd;
  position: fixed;
  bottom: 0;
}

</style>
