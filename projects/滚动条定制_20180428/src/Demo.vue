<template>
  <div>
    <button @click="destroyCustomScroll">销毁</button>
    <button @click="show">显示/隐藏</button>
    <button @click="bindElem">更换定位参照元素</button>
    <p>
      <a>编程式移动：从0起始</a>
      <input type="text" v-model="selectIndex">
    </p>
    <p>
      <a>改变总数</a>
      <input type="text" v-model="totalNum">
    </p>
    <p>
      <a>改变显示个数</a>
      <input type="text" v-model="showNum">
    </p>

  </div>
</template>

<script>
import customScroll from './customScroll.window'
export default {
  data () {
    return {
      totalNum: 12,
      showNum: 3,
      selectIndex: 0,
      positionElem: '#tritem'
    }
  },
  created () { },
  mounted () {
    customScroll({
      boxElem: document.getElementById('content'),
      positionElem: '#tritem', // 可选 定位参照元素
      totalNum: this.totalNum, // 可选 20
      showNum: this.showNum, // 可选，默认 3
      unit: '周', // 可选，默认空
      onChange (w) {
        console.log('显示：', w)
      }
    }).then($customScroll => {
      this.customScroll = $customScroll
    })
    setTimeout(() => {
      document.getElementById('tritem').innerHTML = '<th rowspan=2>年级</th><th rowspan=2><a href="javascript:void(0);"><span>班级</span></a></th><th>5月</th><th>4月</th><th>3月</th><th>2月</th><th colspan=2>汇总</th>'
      this.customScroll.update()
    }, 1000)
  },
  methods: {
    destroyCustomScroll () {
      this.customScroll.destroy()
    },
    show () {
      this.customScroll.show = !this.customScroll.show
    },
    bindElem () {
      this.positionElem = this.positionElem === '#tritem' ? '#tritem2' : '#tritem'
    }
  },
  watch: {
    totalNum (v) {
      this.customScroll.totalNum = v
    },
    showNum (v) {
      this.customScroll.showNum = v * 1
    },
    positionElem (el) {
      this.customScroll.positionElem = el
    },
    selectIndex (i) {
      this.customScroll.selectIndex(i * 1)
    }
  }
}
</script>
