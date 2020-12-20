<template>
  <div class="play">
    <Heade></Heade>
    <div class="cont">
      <div class="img-box">
        <div class="l-img"></div>
        <div class="r-img"></div>
        <div class="cont-main">
          <div id="info"></div>
          <h2>{{title}}</h2>
          <div class="timing"><i>&#xe608;</i>{{timeShow}}</div><span class="fr-num">已输入字数<span class="red">{{count}}</span></span>
          <div class="ipt-box"><input v-if="!isStop" type="number" @input="input" @keydown="keydown" @focus="focus" @blur="blur" ref="ipt"></div>
          <div v-if="iptShow" ref="eIpt" class="ipt" v-click="toFocus"><span>3.</span><span v-for="(v,i) in piVal" :class="{err:v!==d[i]}">{{v}}</span><span class="curr" :class="{err:currPiValErr}">{{currPiVal}}</span><span class="cursor" :class="{flicker:cursorFlicker}"></span></div>
          <div v-else class="ipt" style="overflow:hidden;">
            <div class="tm"><span>{{timeStartCompetition}}</span></div>
          </div>
          <div class="btns cf" :class="{c:type!==1}">
            <a v-click="stop" class="button" v-if="type===1">{{this.isStop?'查看结果':'结束练习'}}</a>
            <router-link class="button gray" :class="{r:type===1}" :to="{name:'Home'}">返回</router-link>
          </div>
        </div>
      </div>
    </div>
    <VMask v-if="showPopup"></VMask>
    <transition name="scale">
    <Result v-if="showPopup" @close="closePopup" :type="type" :num="rightCount" :t="time" @restart="ready" :bus="bus" :title="title"></Result>
    </transition>
    <div class="b-img">
      <div class="img">
        <!--<img src="../assets/imgs/bg.png">-->
      </div>
    </div>
  </div>
</template>

<script>
  import Heade from './Header.vue'
  import Result from './Result.vue'
  import VMask from '@/utils/VMask.vue'
  import Timing from '@/utils/timing'
  import piData from '@/js/pi-data'
  export default {
    props: ['bus'],
    data () {
      return {
        // timeType: 2, // 1 倒计时， 2 顺计时
        time: 0, // 时间，根据 timeType 变化

        // title: '练习模式',
        type: 1, // 1 练习模式, 2 比赛
        iptShow: 0, // 输入框显示
        timeCount: 3, // 比赛开始前倒计时

        timeStartCompetition: 3, // 比赛开始前倒计时

        showPopup: 0,

        piVal: '',
        currPiVal: '',
        err: 0,
        currPiValErr: 0,
        count: 0, // 输入总字符数
        rightCount: 0, // 正确字符数
        isStop: 0,

        cursorId: null,
        cursorFlicker: 0,
        cursorShow: 0,
        d: piData
      }
    },
    mounted () {
      this.timing = new Timing()
      this.ready()
    },
    methods: {
      ready () {
        this.piVal = this.currPiVal = ''
        this.rightCount = this.count = 0
        this.err = 0
        this.iptShow = 0
        this.isStop = 0
        this.time = 0
        if (this.type === 1) {
          this.start()
        } else {
          this.readyCompetition()
        }
      },
      // 开始。开始输入。练习就绪
      start () {
        this.iptShow = 1
        if (this.bus.timeType * 1 === 1 && this.type === 2) {
          this.timing.timeDown(t => {
            this.time = t
          }, () => {
            this.stop()
          }, this.bus.timeCount)
        } else {
          this.timing.start(t => {
            this.time = t
          })
        }
        this.toFocus()
      },
      computeRightCount () {
        let piVal = this.piVal + this.currPiVal
        let len = piVal.length
        let rightCount = len
        for (let i = 0; i < len; i++) {
          if (piVal[i] !== piData[i]) {
            rightCount = i
            break
          }
        }
        this.rightCount = rightCount
      },
      // 结束。结束输入
      stop () {
        this.timing.stop()
        this.blur()
        this.computeRightCount()
        this.showPopup = 1
        this.isStop = 1
      },
      // 比赛就绪
      readyCompetition () {
        this.timing.timeDown(t => {
          this.timeStartCompetition = t
        }, () => {
          this.start()
        }, this.timeCount)
      },
      numFill (number) {
        if (number < 10) {
          return '0' + number
        }
        return number
      },
      input (e) {
        let {target} = e
        let v = target.value
        if (this.isStop === 0 && v) {
          let {count} = this
          v.split('').every(v => {
            this.piVal = this.piVal + this.currPiVal
            let c = this.currPiVal = v
            this.count = count + 1
            if (c !== this.d[count]) {
              this.err = this.currPiValErr = 1
            } else {
              this.currPiValErr = 0
            }
            return true
          })
          this.$nextTick(() => {
            let {eIpt} = this.$refs
            eIpt.scrollTop = eIpt.scrollHeight
          })
        }
        target.value = ''
      },
      keydown (e) {
        if (this.type === 1 && e.keyCode === 8) {
          let {count, piVal, currPiVal} = this
          count = count - 1
          if (count > -1) {
            this.count = count
            this.piVal = (piVal + currPiVal).substr(0, count)
            this.currPiVal = ''
          }
        }
        // window.info.innerHTML += e.keyCode
      },
      // 模拟光标
      cursorMock () {
        clearInterval(this.cursorId)
        this.cursorId = setInterval(() => {
          this.cursorFlicker = !this.cursorFlicker
        }, 600)
      },
      // 开启模拟光标
      focus () {
        this.cursorFlicker = 1
        this.cursorMock()
      },
      // 关掉模拟光标
      blur () {
        this.cursorFlicker = 0
        clearInterval(this.cursorId)
      },
      // 手动获焦
      toFocus (e) {
        if (this.iptShow) {
          this.$nextTick(() => {
            let {ipt} = this.$refs
            if (ipt) {
              ipt.blur()
              ipt.focus()
            }
          })
          e && e.preventDefault()
        }
      },
      closePopup () {
        this.showPopup = 0
      }
    },
    destroyed () {
      this.blur()
      this.timing.stop()
    },
    components: {
      Heade,
      Result,
      VMask
    },
    computed: {
      timeShow: function () {
        let {time} = this
        return this.numFill(~~(time / 60)) + ':' + this.numFill(time % 60)
      },
      title: function () {
        let tit = ''
        if (this.type === 1) {
          tit = '练习'
        } else {
          tit = `困难模式${this.bus.timeType === '1' ? '限时' : '不限时'}挑战`
        }
        return tit
      }
    }
  }
</script>

