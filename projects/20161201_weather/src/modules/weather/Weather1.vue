<template>
  <div class="weather">
    <div class="wtdate">{{wtInfo.currentDate}} <span>{{wtInfo.currentWeek}}</span></div>
    <div class="wt">
      <div class="wtimg"><img :src="wtInfo.icoImg"></div>
      <div class="wtname">{{wtInfo.name}}</div>
    </div>
    <div class="ot">
      <div class="tp"><label>温度</label><span>{{wtInfo.tp}}°C</span></div>
      <div class="api"><label>空气质量</label><span>{{rank.quality}}</span></div>
    </div>
  </div>

</template>

<script>
  import TimeUpdate from '../corejs/time/time-update'
  import { getWeatherInfo, getCityRank } from './base/index'

  let timeUpdate = new TimeUpdate()

  export default {
    name: 'weather1',
    data () {
      return {
        cityName: '深圳',
        wtInfo: {},
        rank: {}
      }
    },
    created () {
      timeUpdate.start(this.update, 1000 * 60 * 60)
    },
    destroyed () {
      timeUpdate.stop()
    },
    methods: {
      update () {
        getWeatherInfo(this.cityName, d => {
          this.wtInfo = d
        })
        getCityRank(this.cityName, d => {
          this.rank = d
        })
      }
    }
  }
</script>

<style scoped>

  .weather {
    background-color: #488cce;
    color: #fff;
    font-size: 20px;
    height: 108px;
    text-shadow: 0px 1px 3px #7b7b7b;
    .wtdate {
      span {
        padding-left: 10px;
      }
    }
    .wt {
      float: left;
      margin-top: -4px;
    }
    .wtimg {

      width: 60px;
      height: 60px;
      img {
        width: 100%;
      }
    }
    .wtname {
      color: #fbf164;
      text-align: center;
      margin-top: -6px;
    }
    .ot {
      overflow: hidden;
      padding-left: 10px;
      span {
        color: #fbf164;
      }
      label {
        padding-right: 10px;
      }
    }
    .tp {
      padding: 16px 0 6px;
    }
    .api {

    }
  }
</style>
