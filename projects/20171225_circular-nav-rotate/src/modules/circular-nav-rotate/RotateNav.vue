<template>
    <transition :name="show?'zoom-in':'zoom-out'"
                :enter-active-class="'transition'"
                :leave-active-class="'transition'">
    <div v-show="show" class="rotate-nav">
      <div ref="eList" class="ct">
        <div class="item" v-for="n of items"><span>{{n}}</span></div>
      </div>
      <div class="rotate-nav-child">
        <div ref="eListChild" class="ct">
          <div class="item" v-for="n of itemsChild"><span>{{n}}</span></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Rotate from './main'
  import autoPrefix from '../corejs/dom/css/autoprefix'
  const transform = autoPrefix('transform')[1]
  export default {
    props: ['show'],
    data () {
      return {
        startIndex: 0,
        itemsPosition: [],
        items: ['清理报废', '事物变更', '维修登记', '资产调拔', '打印标签'],
        itemsChild: ['清理报废', '事物变更', '维修登记']
      }
    },
    mounted () {
      this.init()
      this.initChild()
    },
    methods: {
      init () {
        let rotate = new Rotate()
        let eList = this.$refs.eList
        let eItems = eList.children
        rotate.init({
          each: (i, {x, y}) => {
            eItems[i].style[transform] = `translate(-${x}px,-${y}px)`
          },
          num: 5,
          r: 290
        })
      },
      initChild () {
        let rotate = new Rotate()
        let eList = this.$refs.eListChild
        let eItems = eList.children
        rotate.init({
          each: (i, {x, y}) => {
            eItems[i].style[transform] = `translate(-${x}px,-${y}px)`
          },
          num: 3,
          r: 190
        })
      }
    }
  }
</script>

<style scoped>
  .transition{
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition-property:opacity,transform;
  }
  .rotate-nav {
    position: fixed;
    bottom: -300px;
    right: -300px;

    width: 600px;
    height: 600px;
    border-radius: 100%;
    background: rgba(225, 242, 251, 0.9);
    box-shadow: 0 0 24px #e5e8eb;
    .ct {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0;
      height: 0;
      .item {
        position: absolute;
        top: 0;
        left: 0;
        width: 54px;
        height: 54px;
        background: #fff;
        border-radius: 100px;
        box-shadow: 0 0 16px #d6dde4;

        display: flex;
        align-items: center;
        justify-content: center;
        span {
          padding: 0 8px;
          font-size: 14px;
          line-height: 16px;
          text-align: center;
          color: #6cb7fa;
        }
      }
    }

    .rotate-nav-child{
      position: absolute;
      left: 90px;
      top: 90px;
      width: 420px;
      height: 420px;
      border-radius: 100%;
      background: rgba(225, 242, 251, 0.2);
      box-shadow: 0 0 24px #d6dde4;
    }
  }
</style>
