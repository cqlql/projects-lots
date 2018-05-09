// import dragPlus from '@/modules/corejs/drag/drag-plus'
// import Animation from '@/modules/corejs/animation/animation'
// import offsetxy from '@/modules/corejs/dom/offsetxy'
import scriptLoad from '@/modules/corejs/dom/script-load'
import CustomScrollComponent from './CustomScroll.vue'

let $vm
export default function customScroll ({boxElem = document.body, totalNum = 20, showNum = 3, unit = '', positionElem, onChange}) {
// function customScroll ({ totalNum, onChange }) {
  return scriptLoad('http://p2y63v1s4.bkt.clouddn.com/vue/2.5.13/vue.min.js').then(() => {
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
