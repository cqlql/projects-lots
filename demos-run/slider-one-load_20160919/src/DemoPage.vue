<template>
  <div class="slider-one-load">
    <ul class="sl-move">
      <li class="sl-item" v-for="d of items">
        <div class="sl-cont">
          <div class="ques-test">
            {{d.content}}
            <br>
            <br>
            <br>
            <br>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import '@/modules/slider-one-load/slider-one-load.css'
  import Slider from '@/modules/slider-one-load/slider-one-load'
  export default {
    name: 'slider-one-load',
    data () {
      return {
        totalPage: 5,
        items: [{
          page: 0,
          content: ''
        }, {
          page: 1,
          content: ''
        }, {
          page: 2,
          content: ''
        }]
      }
    },
    mounted () {
      let totalPage = this.totalPage
      let slider = new Slider({
        eDrag: this.$el,
        boxW: this.$el.clientWidth,
        totalPage
      })

      let {items} = this
      slider.onChange = function () {
        let d = this.sliderPositionData.data
        let {pageIndex} = this
        d.forEach(({item: itemIndex}, i) => {
          let page = pageIndex + i - 1
          let item = items[itemIndex]
          items.page = page
          if (page > -1 && page < totalPage) {
            item.content = page + 1 + '页'
          } else {
            item.content = '空白页'
          }
        })
      }

      // 渲染当前页数据
      slider.onChange()
    },
    methods: {

    }
  }
</script>

<style scoped>
.slider-one-load {
  overflow: hidden;
  position: relative;
  height:300px;
  background-color: #ddd;
  .sl-move {
    width: 100%;
    position: relative;
    transform: translate3d(-100%, 0, 0);
  }
  .sl-item {
    list-style-type: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translate3d(100%, 0, 0);

    &:first-child {
      transform: translate3d(0, 0, 0);
    }
    &:last-child {
      transform: translate3d(200%, 0, 0);
    }
  }
  .animated {
    transition:transform 0.3s ease;
  }
}

</style>
