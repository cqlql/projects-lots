<template>
  <div class="m">
    图片裁剪 <a href="javascript:;" @click="rotate">旋转</a>
    <div
      ref="eImgBox"
      class="imgBox"
      :style="{
        width: imgBoxStyle.width + 'px',
        height: imgBoxStyle.height + 'px',
        [transformName]: `rotate(${imgBoxStyle.rotate}deg)`
      }"
    >
      <img
        :src="url"
        :style="{
          width: imgStyle.width + 'px',
          height: imgStyle.height + 'px',
          [transformName]: `translate(${imgStyle.x}px,${imgStyle.y}px) rotate(${imgStyle.rotate}deg)`
        }"
      >
    </div>
  </div>
</template>

<script>
import imgSize from '@/modules/corejs/dom/img-size-complete.js'
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
// import transition from '@/modules/corejs/animation/transition.js'
import transitionendOnce from '@/modules/corejs/animation/transitionend-once'

export default {
  data () {
    return {
      url: 'https://img13.360buyimg.com/n1/s350x449_jfs/t18994/37/1125997630/238618/15b9a7d/5abc8fccN013d0d0a.jpg!cc_350x449.jpg',
      imgBoxStyle: {
        width: 300,
        height: 100,
        rotate: 0
      },
      imgStyle: {
        width: 300,
        height: 100,
        x: 0,
        y: 0,
        rotate: 0
      },
      transformName: autoprefix('transform'),
      // centerXY: {
      //   x: 0,
      //   y: 0
      // }
    }
  },
  async created () {
    this.setSize()
  },
  methods: {
    async setSize () {
      let { imgBoxStyle, imgStyle } = this
      let img
      try {
        img = await imgSize(this.url)
        imgStyle.width = imgBoxStyle.width = img.width
        imgStyle.height = imgBoxStyle.height = img.height
        // this.centerInitXY()
      } catch (err) {
        console.error('图片尺寸获取失败', err)
      }
    },
    rotate () {
      let { imgBoxStyle } = this
      this.transitionStart({
        el: this.$refs.eImgBox,
        active: this.$style.transitionActive,
        start () {
          imgBoxStyle.rotate = 90
        },
        end: () => {
          // 更正。box 旋转恢复，改为旋转 img
          this.rotateCorrect()
        }
      })
    },
    rotateCorrect () {
      let { imgBoxStyle, imgStyle } = this
      let { width } = imgBoxStyle
      imgBoxStyle.width = imgBoxStyle.height
      imgBoxStyle.height = width
      imgBoxStyle.rotate = 0
      imgStyle.rotate = imgStyle.rotate + 90
      this.center()
    },
    center () {
      let { imgBoxStyle, imgStyle } = this
      let { width, height } = imgBoxStyle
      let { width: imgw, height: imgh } = imgStyle
      imgStyle.x = (width - imgw) / 2
      imgStyle.y = (height - imgh) / 2

      // let { imgBoxStyle, imgStyle, centerXY } = this
      // if (imgBoxStyle.width !== imgStyle.width) {
      //   imgStyle.x = centerXY.x
      //   imgStyle.y = centerXY.y
      // } else {
      //   imgStyle.x = 0
      //   imgStyle.y = 0
      // }
    },
    transitionStart ({ el, active, start, end }) {
      let { classList } = el

      // 目前以 active 判断是否进行动画
      // 非动画进行时才注册
      if (!classList.contains(active)) {
        classList.add(active)
        transitionendOnce(el, function () {
          classList.remove(active)
          end()
        })
        start()
      }
    }
    // centerInitXY () {
    //   let { width, height } = this.imgBoxStyle
    //   this.centerXY.x = (height - width) / 2
    //   this.centerXY.y = (width - height) / 2
    // }
  }
}
</script>

<style scoped>
.m {
  padding: 100px;
}
.imgBox {
  /* transition: 0.3s transform ease; */
  border: 5px solid #00a8e8;
}
img {
  /* width: 100%; */
}

</style>
<style module>
.transitionActive {
  transition: 0.3s ease;
}
</style>

