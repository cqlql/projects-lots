<template>
<div class="home">
  <Heade></Heade>
  <div class="bot-img">
    <div class="img"></div>
  </div>
  <div class="cont">
    <div class="img-box">
      <div class="l-img"></div>
      <div class="r-img"></div>
      <div class="cont-main">
        <h2>说明</h2>
        <a class="set" v-click="showPopupSet">&#xe613;</a>
        <div class="det">
          圆周率记忆挑战，分为练习模式和挑战模式。练习模式没有时间限制，练习结束可统计输入的正确位数。挑战模式，分为普通模式和困难模式。普通模式是指自由输入，不即时提醒错误，普通模式限时挑战是指在设定时间内挑战，时间到即挑战结束；普通模式不限时挑战是指不限时间进行数字输入，可手动结束挑战。困难模式是指挑战时输入错误立即结束挑战，困难模式限时挑战是指在设定时间内进行挑战，时间到或者输入错误时挑战结束；困难模式不限时挑战是指不限时间，输入错误时挑战结束。
        </div>
        <div class="btns cf">
          <router-link class="button" :to="{name:'Practice'}">开始练习</router-link>
          <router-link class="button r" :to="{name:challengeRouterName}">开始挑战</router-link>
        </div>
      </div>
    </div>

  </div>
  <VMask v-if="showPopup" @click="closePopupSet"></VMask>
  <transition name="scale">
    <div v-if="showPopup" class="set-popup">
      <div class="s-cont">
        <div class="tit">设置</div>
        <div class="row">
          <span class="lb">挑战人：</span>
          <label><input class="name-in" type="text" v-model="bus.name"></label>
        </div>
        <div class="row">
          <span class="lb">挑战模式：</span>
          <label><input name="mode" type="radio" value="1" v-model="bus.mode">普通模式</label>
          <label><input name="mode" type="radio" value="2" v-model="bus.mode">困难模式</label>
        </div>
        <div class="row">
          <span class="lb">是否限时：</span>
          <label><input name="timeType" type="radio" value="1" v-model="bus.timeType">限时挑战</label>
          <label><input name="timeType" type="radio" value="2" v-model="bus.timeType">不限时挑战</label>
        </div>
        <div class="row" v-show="bus.timeType==='1'">
          <span class="lb">挑战模式：</span>
          <label class="m-lb"><input :value="bus.timeMinute" @input="numberCorrect" type="text" class="t-in"> 分钟</label>
          <!--<select id="minute" v-model="bus.timeMinute">
            <option v-for="v in 10">{{v}}</option>
          </select>
          <label class="m-lb" for="minute">分钟</label>-->
        </div>
        <div class="btns">
          <router-link class="button" :to="{name:challengeRouterName}">开始挑战</router-link>
          <a class="button gray r" v-click="closePopupSet">关闭</a>
        </div>
      </div>

    </div>
  </transition>
</div>
</template>

<script>
  import Heade from './Header.vue'
  import VMask from '@/modules/VMask.vue'
  export default {
    props: ['bus'],
    data () {
      return {
        showPopup: 0
      }
    },
    methods: {
      showPopupSet () {
        this.showPopup = 1
      },
      closePopupSet () {
        this.showPopup = 0
      },
      numberCorrect (e) {
        let el = e.target
        let num = el.value

        num = num.replace(/[^\d]+/g, '')

        if (num > 99) {
          num = 99
        }

        // // 限制只有一个小数点
        // var index = num.indexOf('.')
        // if (index > -1) {
        //   var pre = num.substr(0, index + 1)
        //   var next = num.substr(index + 1)
        //   num = pre + next.replace(/\.\d*/g, '')
        // }
        //
        // // 限制只有2位小数
        // num = num.replace(/(\.\d{2})\d+/, '$1')

        el.value = this.bus.timeMinute = num
      }
    },
    components: {
      Heade,
      VMask
    },
    computed: {
      challengeRouterName () {
        return this.bus.mode === '1' ? 'ChallengeSimple' : 'Challenge'
      }
    }
  }
</script>

<style scoped>
  .set-popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    pointer-events: none;
    .s-cont{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 296px;
      background-color: #fff;
      border-radius: 16px;
      padding: 0 15px;
      box-sizing: border-box;
      pointer-events: auto;

    }
    .tit{
      text-align: center;
      font-size: 16px;
      color: #000;
      font-weight: bold;
      padding: 10px 0;
    }
    .row{
      padding: 5px 8px;
      height: 30px;
      *{
        vertical-align: middle;
      }
      label {
        padding: 5px 0;
      }
      /*select{
        border: 1px solid #bfbfbf;
      }*/
      input{
        margin: 0 3px;
      }
      .t-in{
        width: 60px;
        height: 22px;
        display: inline-block;
        border: 1px solid #bfbfbf;
        text-align: center;
        border-radius: 100px;
      }
      .name-in {
        border: 1px solid #bfbfbf;
        border-radius: 100px;
        padding: 2px 10px 4px;
        width: 160px;
        height: 20px;
        margin: 0;
        line-height: 1;
        outline: none;
      }
      /*.m-lb{
        margin-left: 3px;
      }*/
    }
    .btns{
      padding: 10px 8px 30px;
    }
    .r{
      float: right;
    }

  }
.home{
  margin: 0 auto;

  .cont{

    line-height: 1.5;
    position: fixed;
    left: 34px;
    right: 34px;
    top: 50%;
    color: #6a6a6a;
    transform: translateY(-50%);
    .img-box{

      max-width: 500px;
      margin: 0 auto;
      position: relative;
    }
    .cont-main{
      background-color: #fff;
      box-shadow: 0 1px 4px #929292;
      border-radius: 16px;
      padding:0 18px 0;
      /*background-color: #fff;*/
      /*box-shadow: 0 0 1px #000;*/
      /*border-radius: 10px;*/
      /*color: #6a6a6a;*/
      /*padding:0 18px 0;*/
      /*max-width: 500px;*/
      /*margin: 0 auto;*/
      position: relative;
    }
    h2{
      font-size: 19px;
      color: #0d0c0c;
      text-align: center;
      margin: 0;
      padding:14px 0;
      line-height: 1;
    }
    .set{
      position: absolute;
      right: 30px;
      top: 8px;
      font-family: 'iconfont';
      font-size: 22px;
      font-weight: bold;
      color: #09bddd;
      cursor: pointer;
    }

    .btns{
      padding: 20px 8px;
    }
    .r{
      float: right;
    }
  }


  .bot-img{


    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    .img{
      width: 375px;
      height: 262px;
      background: url('../assets/imgs/1.png') no-repeat center 0;
      background-size: 100% auto;

      margin: 0 auto;
    }
  }
  .l-img{
    width: 68px;
    height: 94px;
    background: url('../assets/imgs/2.png') no-repeat center 0;
    background-size: 100% auto;
    position: absolute;
    left: -14px;
    top: -76px;
  }
  .r-img{
    width: 106px;
    height: 77px;
    background: url('../assets/imgs/3.png') no-repeat center 0;
    background-size: 100% auto;
    position: absolute;
    right: -42px;
    top: -95px;
  }
}
</style>
