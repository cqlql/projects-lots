<template>
  <div class="s-list">
    <div ref="eSel" class="s-sel">
      <div class="s-mask s-t-mask"></div>
      <div class="s-mask s-b-mask"></div>
      <ul ref="eMove" class="s-move">
        <li v-for="item of list" class="s-item" :key="item.value">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import SlideSelectBase from './slide-select-base'
  export default {
    name: 'list-base',
    props: {
      index: {
        type: Number,
        default: 0
      },
      id: Number, // 用来找到是哪个列表项
      list: Array
    },
    mounted () {
      let slideSelectBase = this.slideSelectBase = new SlideSelectBase({
        eDrag: this.$el,
        eMove: this.$refs.eMove,
        itemHeight: this.$refs.eSel.clientHeight,
        onChange: index => {
          this.$emit('change', index, this.id)
        }
      })
      let {list, index} = this
      slideSelectBase.update(list.length)
      slideSelectBase.select(index)
    },
    methods: {
      select (index) {
        this.slideSelectBase.select(index)
      }
    },
    watch: {
      index (index) {
        this.slideSelectBase.select(index)
      },
      list (v) {
        this.slideSelectBase.update(v.length)
      }
    }

  }
</script>

<style scoped>
  .s-list{
    flex:1;
    margin: 0 5PX;
    position: relative;
    overflow: hidden;
  }

  .s-sel{
    height: 30PX;
    border-bottom: 1PX solid #407bff;
    border-top: 1PX solid #407bff;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
  .s-move{
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: 16PX;
    line-height: 1.8;
  }
  .s-item{
    height: 30PX;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .s-mask{
    position: absolute;
    height: 88PX;
    left: 0;
    right: 0;
    background-color: rgba(238, 238, 238, 0.75);
    z-index: 1;
    pointer-events:none;
  }
  .s-t-mask{
    top: 0;
    transform: translate3d(0,-100%,0);
    box-shadow: inset 0 20PX 20PX 0 #eee;
  }
  .s-b-mask{
    bottom: 0;
    transform: translate3d(0,100%,0);
    box-shadow: inset 0 -20PX 20PX 0 #eee;
  }
</style>
