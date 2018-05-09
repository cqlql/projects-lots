<template>
  <div class="box">
    <h2>元素弹窗放大</h2>
    <h3>img 元素</h3>
    <p>已绑定全局</p>

    <img src="https://img12.360buyimg.com/da/jfs/t12934/208/2527250811/122916/3978f71/5a42705fNb5c92a5a.jpg" alt="" data-type="1">
    <img src="https://shared-https.ydstatic.com/gouwuex/images/extension_3_1/hui_sp.png?v=201712120149" alt="" data-type="1">

    <h3>普通元素</h3>
    <div class="el-zoom" @click="open" ref="elemz">
        点我，我可以被放大
    </div>
  </div>

</template>

<script>
  import elemZoomPopup from '../elem-zoom-popup'
  export default {
    mounted () {
    },
    methods: {
      open () {
        elemZoomPopup(this.$refs.elemz)
      }
    }
  }
</script>
<style scoped>
.box {
  img{
    max-width: 100%;
  }
}
.el-zoom {
  background-color: #ddd;
}
</style>
