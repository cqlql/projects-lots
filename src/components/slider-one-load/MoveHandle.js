import transitionendOnce from '@/modules/corejs/animation/transitionend-once'

import MoveArray from './MoveArray'

export default {
  data () {
    return {
      x: 0,
      index: 0,
      page: 0,
      total: 4,
      maxIndex: 3
    }
  },
  mounted () {
    this.maxIndexUpdate()
    this.eMove = this.$el.children[0]
    this.moveArray = new MoveArray(this.itemsPosition)
  },
  methods: {
    move (xSegment) {
      let x = this.x + xSegment
      this.moveElemStyleTransform(x)
    },
    toRight () {
      let {page, index} = this
      let toMoveArray = true
      if (index === this.maxIndex) {
        toMoveArray = false
      }
      page--
      index--
      if (page <= 0) {
        index = page = 0
        toMoveArray = false
      }
      this.page = page
      this.index = index
      this.animate(-index * this.width, () => {
        if (toMoveArray) {
          this.moveArray.toRight()
          this.firstItem.blank = true // 第1个显示项
          index++
        }
        this.index = index
        this.moveElemStyleTransform(-index * this.width)
      })

      // 处理当前显示项
      this.showItem(page, index)
    },
    toLeft () {
      let {page, total, index} = this
      let toMoveArray = true
      let max = total - 1
      if (index === 0) {
        toMoveArray = false
      }
      page++
      index++
      if (page >= max) {
        page = max
        index = this.maxIndex
        toMoveArray = false
      }
      this.page = page
      this.animate(-index * this.width, () => {
        if (toMoveArray) {
          this.moveArray.toLeft()
          this.lastItem.blank = true // 第3个显示项
          index--
        }
        this.index = index
        this.moveElemStyleTransform(-index * this.width)
      })

      // 处理当前显示项
      this.showItem(page, index)
    },
    recovery () {
      this.animate(-this.index * this.width)
    },
    animate (x, cb = () => {}) {
      if (this.x === x) {
        cb()
        return
      }
      this.isRun = true
      const {eMove} = this
      const {classList} = eMove
      const animateActiveClassName = this.$style.animateActive
      classList.add(animateActiveClassName)
      transitionendOnce(eMove, () => {
        this.isRun = false
        classList.remove(animateActiveClassName)
        cb()
      })
      this.moveElemStyleTransform(x)
    },
    moveElemStyleTransform (x) {
      this.x = x
      this.eMove.style[this.transform] = `translate3d(${x}px, 0, 0)`
    },
    maxIndexUpdate () {
      const {total} = this
      this.maxIndex = total < 3 ? total - 1 : 2
    },
    getShowItem (i) {
      const showIndex = this.itemsPosition[i]
      const item = this.itemsData[showIndex]
      item.showIndex = showIndex
      return item
    },
    showItem (page, index) {
      const showItem = this.getShowItem(index)
      showItem.page = page
      this.$emit('toLoad', showItem)
      showItem.blank = false
    }
  },
  computed: {
    firstItem () {
      return this.itemsData[this.itemsPosition[0]]
    },
    lastItem () {
      return this.itemsData[this.itemsPosition[this.maxIndex]]
    }
  },
  watch: {
    total () {
      this.maxIndexUpdate()
    }
  }
}
