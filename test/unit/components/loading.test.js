import Vue from 'vue'
import SliderOneLoad from '@/components/slider-one-load/Index.vue'
describe('slider-one-load', function () {
  function getVm () {
    // 此方式确保宽度不为 0
    const el = document.createElement('div')
    document.body.appendChild(el)

    const vm = new Vue({
      el,
      template: `<SliderOneLoad ref="vSliderOneLoad" @load="onLoad" @setBlank="onSetBlank" :total="5">
        <div v-for="(item, i) of items" class="item" :key="i" :slot="i" v-show="item.blank===false">
          <p>page：{{item.page}}</p>{{item.content}}
        </div>
      </SliderOneLoad>`,
      data () {
        return {
          items: [{
            blank: true
          }, {
            blank: true
          }, {
            blank: true
          }]
        }
      },
      components: {
        SliderOneLoad
      },
      methods: {
        onLoad () {},
        onSetBlank () {}
      }
    })
    return vm.$refs.vSliderOneLoad
  }

  it('触发当前页面加载', function (done) {
  })

  it('移动，动画复原', function (done) {
  })
})
