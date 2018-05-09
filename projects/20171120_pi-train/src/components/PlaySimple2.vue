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
          <!--<div class="ipt-box"><input v-if="!isStop" type="number" @input="input" @keydown="keydown" @focus="focus" @blur="blur" ref="ipt"></div>-->
          <div v-if="iptShow" ref="eIpt" class="ipt" :class="{'no-color':!isStop}" v-click="toFocus"><span ref="ePiPrefix">3.</span>
            <div class="ipt-in" @paste="$event.preventDefault()" ref="ipt" @input="input" @scroll="scroll" :contentEditable.prop="!isStop"></div>
          </div>
          <div v-else class="ipt" style="overflow:hidden;">
            <div class="tm"><span>{{timeStartCompetition}}</span></div>
          </div>
          <!--<div class="btns cf">
            <a v-click="stop" class="button">{{this.isStop?'查看结果':'结束挑战'}}</a>
            <router-link class="button gray r" :to="{name:'Home'}">返回</router-link>
          </div>-->
          <div class="btns cf" :class="{c:bus.timeType!=='2'}">
            <a v-click="stop" class="button" v-if="bus.timeType==='2'">{{this.isStop?'查看结果':'结束挑战'}}</a>
            <router-link class="button gray" :class="{r:bus.timeType==='2'}" :to="{name:'Home'}">返回</router-link>
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
  import VMask from '@/modules/VMask.vue'
  import Timing from '@/modules/timing'
  import piData from '@/js/pi-data'
  import autoprefix from '@/modules/autoprefix.js'
  let transform = autoprefix('transform')[1]
  export default {
    name: 'play-simple',
    props: ['bus'],
    data () {
      return {
        // timeType: 2, // 1 倒计时， 2 顺计时
        time: 0, // 时间，根据 timeType 变化

        // title: '练习模式',
        type: 2, // 1 练习模式, 2 比赛
        iptShow: 0, // 输入框显示

        // 比赛开始前倒计时
        timeCount: 0,
        timeStartCompetition: 3, // 倒计时显示

        showPopup: 0,

        piVal: '',
        currPiVal: '',
        err: 0,
        currPiValErr: 0,
        count: 0, // 输入总字符数
        rightCount: 0, // 正确字符数
        wrongCount: 0, // 错误字符数
        isStop: 0,

        cursorId: null,
        cursorFlicker: 0,
        cursorShow: 0,
        d: piData
      }
    },
    created () {
      this.timing = new Timing()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.ready()
      })
    },
    methods: {
      ready () {
        this.piVal = this.currPiVal = ''
        this.wrongCount = this.rightCount = this.count = 0
        this.err = 0
        this.iptShow = 0
        this.isStop = 0
        this.time = 0
        this.readyCompetition()
      },
      // 开始。开始输入
      start () {
        this.iptShow = 1
        if (this.bus.timeType * 1 === 1) {
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
        this.$nextTick(() => {
          this.$refs.ipt.innerHTML = ''
        })
      },
      input ({target}) {
        let piVal = this.piVal = target.textContent = target.textContent.replace(/[^\d]/g, '')
        this.count = piVal.length
      },
      scroll ({target}) {
        this.$refs.ePiPrefix.style[transform] = `translateY(-${target.scrollTop}px)`
      },
      computeRightCount () {
        let piVal = this.piVal
        let newVal = ''
        let len = piVal.length
        let rightCount = len
        let i = 0
        for (i = 0; i < len; i++) {
          let v = piVal[i]
          if (v !== piData[i]) {
            newVal += '<span class="err">' + v + '</span>'
            rightCount = i
            break
          }
          newVal += v
        }
        this.rightCount = rightCount

        for (i++; i < len; i++) {
          let v = piVal[i]
          if (v === piData[i]) {
            newVal += v
          } else {
            newVal += '<span class="err">' + v + '</span>'
          }
        }
        this.$refs.ipt.innerHTML = newVal
      },
      // 结束。结束输入
      stop () {
        this.timing.stop()
        this.computeRightCount()
        this.showPopup = 1
        this.isStop = 1
      },
      // 比赛就绪。3秒倒计时
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
      keydown (e) {
        if (e.keyCode === 8) {
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
        return `普通模式${this.bus.timeType === '1' ? '限时' : '不限时'}挑战`
      }
    }
  }
</script>
<style scoped>
  .play .ipt {
    min-height: 168px;
    max-height: 200px;
    /*line-height: 1.3;*/
  }
  .ipt-in {
    text-indent: 27px;
    font-size: 26px;
    font-weight: bold;
    position: absolute;
    left: 0;
    top: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding: 3px 6px;
    box-sizing: border-box;
    line-height: 1.2;
    font-family: sans-serif,MicrosoftYahei,tahoma, Srial, helvetica;
    border: 0;
    resize: none;
    outline: none;
  }
</style>
