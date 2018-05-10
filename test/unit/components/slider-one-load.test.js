import Vue from 'vue'
import SliderOneLoad from '@/components/SliderOneLoad/Index.vue'
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

  it('goPage 动画，去最后一页', function (done) {
    const vm = getVm()
    vm.goPage(vm.total, false, function () {
      expect(-vm.x === vm.width * 2).toBe(true)
      done()
    })
  })

  it('goPage 没有动画，去最后一页', function () {
    const vm = getVm()
    vm.goPage(vm.total, false)
    expect(-vm.x === vm.width * 2).toBe(true)
  })

  it('动画', function (done) {
    const vm = getVm()
    vm.animate(-1 * vm.width, done)
  })

  it('触发当前页面加载', function (done) {
    const vm = getVm()
    vm.$on('load', done)
    vm.goPage(1, false)
  })

  it('移动，动画复原', function (done) {
    const vm = getVm()

    // 动画结束事件
    function transitionend () {
      done()
    }

    const eMove = vm.$el.children[0]
    eMove.addEventListener('transitionend', transitionend)
    eMove.addEventListener('webkitTransitionEnd', transitionend)

    vm.move(-vm.width / 2)
    vm.recovery()
  })
})
