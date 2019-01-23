<template>
  <div class="s-list">
    <div ref="eSel" class="s-sel">
      <div class="s-mask s-t-mask" />
      <div class="s-mask s-b-mask" />
      <ul ref="eMove" class="s-move">
        <li v-for="(item, i) of list" :key="item.value" class="s-item" :class="{active: activeIndex===i}">{{ item.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import SlideSelectBase from './slide-select-base'
export default {
  name: 'ListBase',
  props: {
    index: {
      type: Number,
      default: 0
    },
    id: Number, // 用来找到是哪个列表项
    list: Array
  },
  data () {
    return {
      activeIndex: this.index
    }
  },
  watch: {
    index (index) {
      this.slideSelectBase.select(index)
    },
    list (v) {
      this.slideSelectBase.update(v.length)
    }
  },
  mounted () {
    let slideSelectBase = this.slideSelectBase = new SlideSelectBase({
      eDrag: this.$el,
      eMove: this.$refs.eMove,
      itemHeight: this.$refs.eSel.clientHeight,
      onChange: index => {
        this.activeIndex = index
        this.$emit('change', index, this.id)
      },
      onActive: index => {
        this.activeIndex = index
      }
    })
    let { list, index } = this
    slideSelectBase.update(list.length)
    slideSelectBase.select(index)
  },
  methods: {
    select (index) {
      this.slideSelectBase.select(index)
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
    color: #aaa;
  }

  .s-sel{
    height: 30PX;
    border-bottom: 1PX solid #eee;
    border-top: 1PX solid #eee;
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
    /* transform: scale(1); */
    transition: transform 0.2s;
  }
  .s-item.active {
    color: #88b8f8;
    transform: scale(1.2);
    /* font-size: 18px; */
  }

  .s-mask{
    position: absolute;
    height: 88PX;
    left: 0;
    right: 0;
    /* background-color: rgba(238, 238, 238, 0.75); */
    z-index: 1;
    pointer-events:none;
  }
  .s-t-mask{
    top: 0;
    transform: translate3d(0,-100%,0);
    background: linear-gradient(to top,rgba(255, 255, 255, 0),#fff);
    /* box-shadow: inset 0 20PX 20PX 0 #eee; */
  }
  .s-b-mask{
    bottom: 0;
    transform: translate3d(0,100%,0);
    background: linear-gradient(to bottom,rgba(255, 255, 255, 0),#fff);
    /* box-shadow: inset 0 -20PX 20PX 0 #eee; */
  }
</style>
