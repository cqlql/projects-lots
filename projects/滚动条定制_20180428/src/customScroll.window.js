// import dragPlus from '@/utils/corejs/drag/drag-plus'
// import Animation from '@/utils/corejs/animation/animation'
// import offsetxy from '@/utils/corejs/dom/offsetxy'
import scriptLoad from '@/utils/corejs/dom/script-load'
import CustomScrollComponent from './CustomScroll.vue'

let $vm
export default function customScroll ({boxElem = document.body, totalNum = 20, showNum = 3, unit = '', positionElem, onChange}) {
// function customScroll ({ totalNum, onChange }) {
  return scriptLoad('http://style.shenduxuetang.com/vue/2.5.21/vue.runtime.min.js').then(() => {
    const CustomScroll = window.Vue.extend(CustomScrollComponent)
    if (!$vm) {
      $vm = new CustomScroll().$mount()
      boxElem.appendChild($vm.$el)
    }
    $vm.totalNum = totalNum
    $vm.showNum = showNum
    $vm.unit = unit
    $vm.positionElem = positionElem
    $vm.boxElem = boxElem
    $vm.onChange = onChange

    return $vm
  })
}

// module.exports = customScroll
