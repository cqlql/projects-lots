<template>
  <div class="demo1">
    <h2>直接绑定图片</h2>
    <div ref="box" class="box">
      <img src="./1.jpg" alt="">
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Drag from '../index'
  import popup from '../../popup/popup-single'
  import imgComplete from '../../corejs/dom/img-complete'
  export default {
    data () {
      return {
        switchState: false,
        switchType: 'left'
      }
    },
    mounted () {
      let drag = new Drag()
      let elem = this.$refs.box
      let elemz = elem.children[0]
      this.$nextTick(() => {
        imgComplete(elemz.src, function () {
          drag.init({
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
    height: 412px;
    img{
      position: absolute;

    }
  }
  img{
    width: 100%;
  }
}

</style>
