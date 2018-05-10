import Vue from 'vue'
import Loading from '@/components/Loading/Index.vue'
describe('loading', function () {
  function getVm () {
    // 此方式确保宽度不为 0
    const el = document.createElement('div')
    document.body.appendChild(el)

    const vm = new Vue({
      el,
      template: `<Loading ref="vLoading"/>`,
      data () {
        return { }
      },
      components: {
        Loading
      }
    })
    return vm.$refs.vLoading
  }

  it('显示：200ms 后显示', function () {
    const vm = getVm()
    vm.show()
  })
  it('显示：直接显示', function () {
    const vm = getVm()
    vm.show({
      time: 0
    })
  })

  it('隐藏', function () {
    const vm = getVm()
    vm.hide()
  })
})
