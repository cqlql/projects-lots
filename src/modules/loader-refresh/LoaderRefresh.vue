<template>
  <RefreshTop ref="vRefreshTop" @reload="reload" :color="colorTop">
    <slot/>
    <LoaderBottom ref="vLoaderBottom" @loadData="loadData" :color="colorBottom"/>
  </RefreshTop>
</template>
<script>
  import LoaderBottom from '../loader-bottom'
  import RefreshTop from '../refresh-top'
  export default {
    props: {
      // 图标字体颜色。两种色系选择
      // black、white
      colorTop: {
        type: String,
        default: 'black'
      },
      colorBottom: {
        type: String,
        default: 'black'
      }
    },
    components: {
      RefreshTop,
      LoaderBottom
    },
    methods: {
      reload (complete) {
        let {vLoaderBottom} = this.$refs
        this.$emit('loadData', {
          type: 'refresh',
          complete,
          vLoaderBottom
        })
      },
      loadData (loaded) {
        let {vLoaderBottom} = this.$refs
        this.$emit('loadData', {complete: loaded, vLoaderBottom})
      },
      // 手动顶部刷新
      // 刷新当前页
      refresh () {
        this.$refs.vRefreshTop.refresh()
      },
      // 手动底部全新加载
      // 清除所有数据后进行全新加载用，比如切换页面
      reStart () {
        this.$refs.vLoaderBottom.reStart()
      }
    }
  }
</script>
