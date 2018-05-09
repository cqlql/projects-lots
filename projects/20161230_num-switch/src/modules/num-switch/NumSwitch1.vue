<template>
<div>
  <div class="inner-points">
    <p class="question">根据随机产生的数字，回答问题</p>
    <div class="random-list">
      <SwitchComp :num="d[0]" :mode="1"></SwitchComp>
      <SwitchComp :num="d[1]" :mode="1"></SwitchComp>
      <SwitchComp :num="d[2]" :mode="2"></SwitchComp>
      <SwitchComp :num="d[3]" :mode="1"></SwitchComp>
      <SwitchComp :num="d[4]" :mode="1"></SwitchComp>
      <SwitchComp :num="d[5]" :mode="2"></SwitchComp>
      <SwitchComp :num="d[6]" :mode="1"></SwitchComp>
      <SwitchComp :num="d[7]" :mode="1"></SwitchComp>
      <div class="count four">=</div>
      <div class="count five">？</div>
      <div class="count seven" v-click="start" ref="startBtn"></div>
    </div>
    <div class="button">
      <button v-click="reset">重置</button>
      <a href="index.html">返回</a>
    </div>
  </div>
  <p v-show="showEquationNum" class="tip">本关你需要完成{{equationTotal}}题，你现在已经完成了<span>{{equationTotal-showEquationNum}}</span>题</p>
  <p v-show="!showEquationNum" class="tip1">恭喜你顺利完成了这一关！</p>
</div>
</template>

<script>
  import SwitchComp from './SwitchComp'

  function clickMobile ({elem, start, end}) {
    let touchdown
    let touchcancel

    elem.addEventListener('touchstart', touchstart, true)
    elem.addEventListener('touchmove', touchmove, true)
    elem.addEventListener('touchend', touchend, true)

    function touchend (e) {
      if (touchcancel) return
      if (touchdown) end.call(this, e)
      touchdown = touchcancel = false
    }

    function touchstart (e) {
      touchdown = true
      touchcancel = false
      start.call(this, e)
    }

    function touchmove () {
      touchcancel = true
      end()
    }

    return function () {
      elem.removeEventListener('touchend', touchend)
      elem.removeEventListener('touchstart', touchstart)
      elem.removeEventListener('touchmove', touchmove)
    }
  }

  export default {
    props: ['equation'],
    data () {
      return {
        ds: [],
        d: [-1, -1, -1, -1, -1, -1, -1, -1],
        showEquationNum: 0,
        equationTotal: 0
      }
    },
    mounted () {
      this.reset()

      // 按钮动画
      let startBtn = this.$refs.startBtn
      let {classList} = startBtn
      clickMobile({
        elem: startBtn,
        start () {
          classList.add('active')
        },
        end () {
          classList.remove('active')
        }
      })
    },
    methods: {
      start () {
        if (this.isRun || !this.equationCount) return

        this.isRun = true
        this.d = this.randomGet()
        let i = 0
        let j = 0
        let child = this.$children
        child.forEach((comp) => {
          setTimeout(() => {
            comp.start(() => {
              if (++j === 8) {
                // 结束
                child.forEach(comp => {
                  this.isRun = false
                  comp.clear()
                  this.showEquationNum = this.equationCount
                })
              }
            })
          }, 60 * i)
          i++
        })
      },
      equationParse (str) {
        let d = []
        str.match(/[\d]+|[-+]/g).forEach(function (v) {
          if (isNaN(v)) {
            if (v === '+') {
              d.push(0)
            } else {
              d.push(1)
            }
          } else {
            if (v > 9) {
              d.push(v[0])
              d.push(v[1])
            } else {
              d.push(-1)
              d.push(v)
            }
          }
        })
        for (let i = d.length; i < 8; i++) {
          d[i] = -1
        }
        return d
      },
      randomGet () {
        let {ds, equationCount} = this
        return this.equationParse(ds.splice(Math.random() * 100 % equationCount, 1)[0])
      },
      reset () {
        if (this.isRun) return
        this.d = [-1, -1, -1, -1, -1, -1, -1, -1]
        let child = this.$children
        child.forEach((comp) => {
          comp.reset()
        })
        let ds = this.ds = this.five()
        this.equationTotal = this.showEquationNum = ds.length
      },
      // 随机五题
      five () {
        let ques = this.equation
        let arr = ques.split(',')
        let newArr = []
        for (let i = 0; i < 5; i++) {
          newArr.push(arr.splice(Math.random() * 100 % arr.length, 1)[0])
        }
        return newArr
      }
    },
    watch: {
      equation () {
        this.reset()
      }
    },
    computed: {
      equationCount () {
        return this.ds.length
      }
    },
    components: {
      SwitchComp
    }
  }
</script>

