
<script>
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
export default {
  props: {
    imgs: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      viewImgs: [],
      currIndex: 0,
      transformName: autoprefix('transform')
    }
  },
  computed: {
    count () {
      return this.viewImgs.length
    },
    // 当前左边 index
    currIndexLeft () {
      let index = this.currIndex - 1
      if (index < 0) {
        return this.count - 1
      }
      return index
    },
    eItems () {
      return this.$refs.eBox.children
    },
    eCurrItem () {
      return this.eItems[this.currIndex]
    }
  },
  watch: {
    imgs () {
      this.imgsSet()
    }
  },
  created () {
    this.imgsSet()
  },
  mounted () {
    this.initShow()
  },
  methods: {
    leftHide () {
      // this.toCss(this.eCurrItem, -100)
      this.animate(this.eCurrItem, -100)
    },
    rightShow () { },
    swipeLeft () {
      this.leftHide()
      this.rightShow()
    },
    hide () {},

    imgsSet () {
      this.viewImgs = this.imgs
    },
    toCss (el, v) {
      el.style[this.transformName] = `translateX(${v}%)`
    },
    animate (el, v) {
      animate(el, this.$style.animated, {
        [this.transformName]: `translateX(${v}%)`
      })
    },
    initShow () {
      this.toCss(this.eCurrItem, 0)
    }
  },
  render () {
    let { $style: s } = this
    let sItem = s.item
    let lis = []
    this.viewImgs.forEach(url => {
      lis.push(
        <li class={sItem}>
          <img src={url} />
        </li>
      )
    })
    return (
      <ul ref="eBox" class={s.box}>{lis}</ul>
    )
  }
}
</script>

<style module>
.box {
  /* height: 100%; */
  width: 200px;
  height: 100px;
  background-color: #000;
  overflow: hidden;
  position: relative;
}
.item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  transform: translateX(-100%);

  img {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
.animated {
  transition:transform 0.3s ease;
}
</style>
