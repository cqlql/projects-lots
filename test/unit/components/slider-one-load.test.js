import Vue from 'vue'
import SliderOneLoadDemoComponent from '@/components/slider-one-load/Demo.vue'
describe('slider-one-load', function () {
  function getVm () {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const SliderOneLoadDemo = Vue.extend(SliderOneLoadDemoComponent)
    const vSliderOneLoadDemo = new SliderOneLoadDemo().$mount(el)
    // vm = vSliderOneLoadDemo.$refs.vSliderOneLoad
    return vSliderOneLoadDemo.$refs.vSliderOneLoad
  }
  // let vm
  // let transitionend = () => { }
  // beforeEach(function () {
  //   const el = document.createElement('div')
  //   document.body.appendChild(el)
  //   const SliderOneLoadDemo = Vue.extend(SliderOneLoadDemoComponent)
  //   const vSliderOneLoadDemo = new SliderOneLoadDemo().$mount(el)
  //   vm = vSliderOneLoadDemo.$refs.vSliderOneLoad
  // })

  beforeAll(function () {
  })

  fit('goPage 动画到最后一页', function (done) {
    const vm = getVm()
    console.log('total', vm.total)
    // console.log('width', vm.width)
    vm.goPage(vm.total, function () {
      expect(-vm.x === vm.width * 2).toBe(true)
      done()
    })
    // console.log(new SliderOneLoad())
  })

  it('goPageNoAnimate', function () {
    const vm = getVm()
    vm.goPageNoAnimate(1)
  })

  it('触发当前页面加载', function () {

  })

  it('动画', function (done) {
    getVm().animate(-1 * vm.width, done)
  })
})
