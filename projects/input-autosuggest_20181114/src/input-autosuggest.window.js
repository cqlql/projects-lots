// import dragPlus from '@/libs/corejs/drag/drag-plus'
// import Animation from '@/libs/corejs/animation/animation'
// import offsetxy from '@/libs/corejs/dom/offsetxy'
import scriptLoad from '@/libs/corejs/dom/script-load'
import InputAutosuggestComponent from './InputAutosuggest.vue'

export default class InputAutosuggest {
  constructor (el) {
    this.$vm = null
    this.dataList = []
    this.dataChangeFn = []
    this.selectedIndex = null
    this.isShow = true
    this.valueKeyName = 'value'
    this.placeholder = ''
    this.init(el)
  }
  async init (el) {
    el = typeof el === 'string' ? document.querySelector(el) : el
    const className = el.className
    if (!window.Vue) {
      await scriptLoad('http://p2y63v1s4.bkt.clouddn.com/vue/2.5.13/vue.min.js')
    }
    const CustomScroll = window.Vue.extend(InputAutosuggestComponent)
    if (this.$vm === null) {
      const vm = this.$vm = new CustomScroll().$mount(el)
      vm.list = this.dataList
      vm.valueKeyName = this.valueKeyName
      vm.placeholder = this.placeholder
      vm.isShow = this.isShow
      vm.select(this.selectedIndex)
      vm.$on('dataChange', result => {
        this.dataChangeFn.forEach(fn => { fn(result) })
      })
      vm.$el.querySelector('input').className = className
    }
  }
  setData (d) {
    const vm = this.$vm
    if (vm) {
      vm.list = d
    } else {
      this.dataList = d
    }
  }
  onDataChange (fn) {
    this.dataChangeFn.push(fn)
  }
  select (index) {
    const vm = this.$vm
    if (vm) {
      vm.select(index)
    } else {
      this.selectedIndex = index * 1
    }
  }
  hide () {
    this.show(false)
  }
  show (isShow = true) {
    const vm = this.$vm
    if (vm) {
      vm.isShow = isShow
    } else {
      this.isShow = isShow
    }
  }
  reset () {
    if (this.$vm) this.$vm.reset()
  }
}
