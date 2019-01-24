<template>
  <div>
    <button @click="show">弹出1</button>
    <button @click="showTop">顶部弹出2</button>
    <SlideSelect ref="vSlideSelect" />
    <SlideSelectTop ref="vSlideSelectTop" />
  </div>
</template>

<script>
import SlideSelect from './SlideSelect.vue'
import SlideSelectTop from './SlideSelectTop.vue'
export default {
  components: {
    SlideSelect,
    SlideSelectTop
  },
  mounted () {
    // this.show()
  },
  methods: {
    show () {
      this.$refs.vSlideSelect.show({
        titles: ['开始', '结束'],
        lists: [[
          {
            text: '项1',
            value: 1
          },
          {
            text: '项2',
            value: 2
          },
          {
            text: '项3',
            value: 3
          },
          {
            text: '项4',
            value: 4
          }
        ], [
          {
            text: '项11',
            value: 11
          },
          {
            text: '项12',
            value: 22
          },
          {
            text: '项33',
            value: 33
          },
          {
            text: '项44',
            value: 44
          }
        ]],
        // selectedIndexs: [0, 0], // 当前选择，通过重新赋值控制子组件选择
        selectedValues: [2], // 当前选择
        onConfirm (selectedValues) {
          console.log(selectedValues)
          return false // 可阻止关闭
        }
      })
    },
    showTop () {
      this.$refs.vSlideSelectTop.show({
        // titles: ['开始', '结束'],
        lists: [[
          {
            text: '项1',
            value: 1
          },
          {
            text: '项2',
            value: 2
          },
          {
            text: '项3',
            value: 3
          },
          {
            text: '项4',
            value: 4
          }
        ], [
          {
            text: '项11',
            value: 11
          },
          {
            text: '项12',
            value: 22
          },
          {
            text: '项33',
            value: 33
          },
          {
            text: '项44',
            value: 44
          }
        ]],
        // selectedIndexs: [0, 0], // 当前选择，通过重新赋值控制子组件选择
        selectedValues: [2], // 当前选择
        onConfirm (selectedValues) {
          console.log(selectedValues)
          return false // 可阻止关闭
        }
      })
    }
  }
}
</script>
