<template>
  <div class="demo1">
    <h2>直接绑定图片</h2>
    <div ref="box" class="box">
      <img src="./1.jpg" alt="">
    </div>
  </div>
</template>

<script>
import ElemZoom from '@/modules/zoom-touch/elem-zoom.js'
import imgComplete from '@/modules/corejs/dom/img-complete'
export default {
  data () {
    return {
      switchState: false,
      switchType: 'left'
    }
  },
  mounted () {
    let elemZoom = new ElemZoom()
    let elem = this.$refs.box
    let elemz = elem.children[0]
    this.$nextTick(() => {
      imgComplete(elemz.src, function () {
        elemZoom.init({
          elem,
          elemz: elem.children[0]
        })
      })
    })
  }
}
</script>

<style scoped>
.demo1 {
  .box{
    position: relative;
    border: 5px solid #000;
    width: 300px;
    height: 483px;
    img{
      position: absolute;

    }
  }
  img{
    width: 100%;
  }
}

</style>
