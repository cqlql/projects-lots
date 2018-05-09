import Vue from 'vue'
import SliderOneLoadComponent from '@/components/slider-one-load/Index.vue'
describe('slider-one-load', function () {
  it('toLeft', function() {
    const SliderOneLoad = Vue.extend(SliderOneLoadComponent)
    const vSliderOneLoad = new SliderOneLoad().$mount()
    vSliderOneLoad.toLeft()
    console.log(vSliderOneLoad.toLeft)
    // console.log(new SliderOneLoad())
  })
})
