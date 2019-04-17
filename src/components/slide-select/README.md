# 下拉滑动选择 <!-- omit in toc -->

- [快速使用](#%E5%BF%AB%E9%80%9F%E4%BD%BF%E7%94%A8)
- [异步加载使用](#%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD%E4%BD%BF%E7%94%A8)


## 快速使用

```html
<template>
  <div>
    <button @click="show">弹出1</button>
    <button @click="showTop">顶部弹出2</button>
    <SlideSelect ref="vSlideSelect" />
    <SlideSelectTop ref="vSlideSelectTop" />
  </div>
</template>

<script>
import SlideSelect from '@/components/slide-select2/SlideSelect.vue'
import SlideSelectTop from '@/components/slide-select2/SlideSelectTop.vue'
export default {
  components: {
    SlideSelect,
    SlideSelectTop
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

```

## 异步加载使用

```js
let vSlideSelectTop = this.$refs.vSlideSelectTop
// 先显示
vSlideSelectTop.show()
// 加载数据，并设置选项
let options = await this.getSelectGradeClassOptions()
vSlideSelectTop.setOptions(options)
```