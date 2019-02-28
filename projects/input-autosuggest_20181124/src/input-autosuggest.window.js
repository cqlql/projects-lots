// import dragPlus from '@/modules/corejs/drag/drag-plus'
// import Animation from '@/modules/corejs/animation/animation'
// import offsetxy from '@/modules/corejs/dom/offsetxy'
import '@/modules/corejs/common.js'
import scriptLoad from '@/modules/corejs/dom/script-load'
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
    this.readyQueue = []
  }
  async init (el) {
    el = typeof el === 'string' ? document.querySelector(el) : el
    const className = el.className
    if (!window.Vue) {
      await scriptLoad('/Content/Scripts/vue.runtime.min.js')
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

      // 把加载期间生成的队列全部执行了
      this.readyQueueExcu()
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
  setVm (excu) {
    const vm = this.$vm
    if (vm) {
      excu(vm)
    } else {
      this.readyQueue.push(excu)
    }
  }
  readyQueueExcu () {
    let fn = this.readyQueue.shift()
    if (fn) {
      fn(this.$vm)
      this.readyQueueExcu()
    }
  }
}
