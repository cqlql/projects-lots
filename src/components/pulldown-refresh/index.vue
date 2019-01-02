<template>
  <div class="refresh-top" :class="[color==='white'?'r-white':'']">
    <div
      class="refresh-top-bg"
      :class="[['static', 'start','ready','loading','complete'][states]]"
    >
      <!-- <span class="preloader" :class="[color==='white'?'preloader-white':'']"></span> -->
      <LoadIco :color="color" class="preloader" />
      <span class="r-arrow" />
      <span class="txt">{{ ['', '下拉刷新','松开刷新','加载中','刷新完成'][states] }}</span>
    </div>
    <div ref="cont" class="refresh-top-cont">
      <slot />
    </div>
  </div>
</template>

<script>
import LoadIco from '@/components/ico/load'
import Darg from './drag'
export default {
  components: {
    LoadIco
  },
  props: {
    // 图标字体颜色。两种色系选择
    // black、white
    color: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      states: 0 // 0 未开始 1 已开始，不满足 2 满足 3 加载中 4 加载完成
    }
  },
  mounted () {
    this.drag = new Darg({
      elem: this.$refs.cont,
      // elemDrag: document,
      elemDrag: this.$el,
      maxY: 60,
      loadingY: 30,
      onChange: state => {
        this.states = state
      },
      onReload: complete => {
        this.$emit('reload', complete)
      }
    })
  },
  destroyed () {
    this.drag.unbind()
  },
  methods: {
    refresh () {
      this.drag.refresh()
    }
  }
}
</script>

<style scoped>
  .refresh-top {
    /* background-color: #aaa; */
    position: relative;
    .r-arrow{
      vertical-align: middle;
      width: 24px;
      height: 24px;
      background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M469.09%20983.91L190.24%20715.78c-21.45-21.45-21.45-53.62%201e-8-75.07s53.62-21.45%2075.07%200L458.37%20823.03l0-750.77c0-32.17%2021.45-53.62%2053.62-53.62s53.62%2021.45%2053.62%2053.62l0%20750.77L758.68%20629.97c21.45-10.72%2053.62-10.72%2075.07%2010.72%2021.45%2021.45%2021.45%2053.62%201e-8%2075.07l-268.13%20268.13c-10.72%2010.72-53.62%2053.62-96.52%200z%22%20fill%3D%22%236c6c6c%22%3E%3C/path%3E%3C/svg%3E');
      background-size: 100%;
      transition: 0.3s ease;
      display: none;
    }
    .txt{
      vertical-align: middle;
      color: #6c6c6c;
    }
    &.r-white{
      .r-arrow {
        background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M469.09%20983.91L190.24%20715.78c-21.45-21.45-21.45-53.62%201e-8-75.07s53.62-21.45%2075.07%200L458.37%20823.03l0-750.77c0-32.17%2021.45-53.62%2053.62-53.62s53.62%2021.45%2053.62%2053.62l0%20750.77L758.68%20629.97c21.45-10.72%2053.62-10.72%2075.07%2010.72%2021.45%2021.45%2021.45%2053.62%201e-8%2075.07l-268.13%20268.13c-10.72%2010.72-53.62%2053.62-96.52%200z%22%20fill%3D%22%23fff%22%3E%3C/path%3E%3C/svg%3E');
      }
      .txt{
        color: #fff;
      }
    }

    .preloader{
      vertical-align: middle;
      display: none;
    }
    .start .r-arrow{
      display: inline-block;
    }
    .ready .r-arrow{
      display: inline-block;
      transform: rotate(-180deg);
    }
    .loading .r-arrow{
      display: none;
    }
    .loading .preloader{
      display: inline-block;
    }
    .complete .r-arrow{
      display: none;
    }
  }
  .refresh-top-bg {
    text-align: center;
    position: absolute;
    width: 100%;
    padding-top: 4px;
  }
  .refresh-top-cont {
    position: relative;
    /* background-color: #fff; */
    &.transition-active{
      transition: 0.3s ease;
    }
  }

</style>
