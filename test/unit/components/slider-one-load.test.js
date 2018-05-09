import Vue from 'vue'
import SliderOneLoadDemoComponent from '@/components/slider-one-load/Demo.vue'
xdescribe('slider-one-load', function () {
  function getVm () {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const SliderOneLoadDemo = Vue.extend(SliderOneLoadDemoComponent)
    const vSliderOneLoadDemo = new SliderOneLoadDemo().$mount(el)
    return vSliderOneLoadDemo.$refs.vSliderOneLoad
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
    getVm().animate(-1 * vm.width, done)
  })

  xit('触发当前页面加载', function () {

  })
})
