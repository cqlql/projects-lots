<template>
  <div class="calendar">
    <div id="info"></div>
    <div class="c-head">
      <a class="sel" @click="next">{{year}}/{{month}}<span
        class="down-arrow">▼</span></a>
      <a class="c-today" @click="goToday" :class="{grey:!isToday}">今</a>
    </div>
    <div class="sel-list">
      <div class="s-year" @click="yearChange">
        <span class="y">{{year}}</span>
        <a class="la">&lt;</a>
        <a class="ra">&gt;</a>
      </div>
      <div class="month-box" @click="monthChange">
        <div class="mon" v-for="(m,i) in monthData" :data-index="i" :class="{selected:i===month-1}">{{m}}</div>
      </div>
    </div>
    <div class="week">
      <div class="wk" v-for="(v,i) in week" :class="{hday:i>4}">周{{v}}</div>
    </div>

    <div ref="eSlideLoader" class="slide-loader">
      <ul class="sl-move" @click="dayChange">
        <li class="sl-item" v-for="(ds,i) in days" :data-index="i">
          <div class="days">
            <div class="day" v-for="d in ds" :class="{grey:d.isPrev||d.isNext,tdy:d.isToday,selected:d.isCurr,has:d.calendarIndex!==undefined}" :data-value="d.value"><span>{{d.date}}</span></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Datetime from '../src/modules/datetime'
  import SliderOne from '@/libs/slider-one/slider-one'
  import calendarHandle from './calendar-handle'
  let datetime = new Datetime()
  export default {
    data () {
      return {
        year: '',
        month: '',
        day: '',
        isToday: false,
        today: '', // 2017/8/8
        currDate: null, // ate 对象
        week: ['一', '二', '三', '四', '五', '六', '日'],
        monthData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        days: [[], [], []],
        positionData: [{
          item: 0 // 这个固定
        }, {
          item: 1 // 这个固定
        }, {
          item: 2 // 这个固定
        }],
        calendarData: {
          '2017/11/23': 1
        }
      }
    },
    methods: {
      getDateValue (date) {
        let year = date.getFullYear()
        let month = date.getMonth() + 1 + ''
        let day = date.getDate()
        if (month.length === 1) {
          month = '0' + month
        }
        return `${year}/${month}/${day}`
      },
      next () {
        let date = this.currDate
        date.setDate(date.getDate() + 7)
        this.$set(this.days, 1, datetime.getWeekDate(date))
      },
      goToday () {
        this.selectDate(new Date())
      },
      getWeekDataPrev () {
        let date = this.currDate
        date.setDate(date.getDate() - 7)
        let d = datetime.getWeekDate(date, true)
        date.setDate(date.getDate() + 7)
        return d
      },
      getWeekDataNext () {
        let date = this.currDate
        date.setDate(date.getDate() + 7)
        let d = datetime.getWeekDate(date, true)
        date.setDate(date.getDate() - 7)
        return d
      },
      getDate () {
        return [this.getWeekDataPrev(), datetime.getWeekDate(this.currDate), this.getWeekDataNext()]
      },
      selectDate (date) {
        /* eslint-disable */
        let {positionData, currDate, days} = this
        let currWeekDays = days[positionData[1].item]
        let toWeekDays = datetime.getWeekDate(date)
        let currFirst = currWeekDays[0].value
        let toFirst = toWeekDays[0].value

        if (currFirst === toFirst) {
          this.currWeekChangeDay(toWeekDays, 1)
          this.currDate = date
          this.updateDateField()
        } else if (currFirst < toFirst) {
          this.$set(days, positionData[2].item, toWeekDays)
          this.currDate = date
          this.sliderOne.swipeLeft({
            type: 1
          })
        } else {
          this.$set(days, positionData[0].item, toWeekDays)
          this.currDate = date
          this.sliderOne.swipeRight({
            type: 1
          })
        }
      },
      updateDateField () {
        let {currDate} = this
        let year = this.year = currDate.getFullYear()
        let month = this.month = currDate.getMonth() + 1
        let day = this.day = currDate.getDate()
        this.isToday = `${year}/${month}/${day}` === this.today
      },
      yearChange (e) {
        if (this.sliderOne.isRun) return
        let {classList} = e.target
        if (classList.contains('la')) {
          let year = this.year = this.year - 1
          this.selectDate(new Date(year, 0, 1))
        } else if (classList.contains('ra')) {
          let year = this.year = this.year + 1
          this.selectDate(new Date(year, 0, 1))
        }
      },
      monthChange (e) {
        if (this.sliderOne.isRun) return
        let {target} = e
        let {classList} = target
        if (classList.contains('mon')) {
          let {index} = target.dataset
          this.month = index * 1 + 1
          this.selectDate(new Date(this.year, index, 1))
        }
      },
      dayChange (e) {
        let {target} = e
        if (target.tagName === 'SPAN') {
          let currDate = this.currDate = new Date(target.parentElement.dataset.value)
          this.currWeekChangeDay(currDate)
        }
      },
      // 当前周天改变
      currWeekChangeDay (date, isWeekDays) {
        let weekDays = isWeekDays ? date : datetime.getWeekDate(date)
        this.days[this.positionData[1].item].forEach((d, i) => {
          let day = weekDays[i]
          d.isCurr = day.isCurr
          d.isPrev = day.isPrev
          d.isNext = day.isNext
        })
        this.updateDateField()
      }
    },
    created () {
      let today = this.currDate = new Date()
      this.today = this.getDateValue(today)
      this.updateDateField()
      let days = this.days = this.getDate()
      calendarHandle(days[1])
    },
    mounted () {
      let {eSlideLoader} = this.$refs
      this.sliderOne = new SliderOne({
        eDrag: eSlideLoader,
        boxW: eSlideLoader.clientWidth
      })
      this.sliderOne.onChange = (data, direct, type) => {
        if (!type) {
          // 上下星期
          let date = this.currDate
          let day = (date.getDay() || 7) - 1
          if (direct === 'r') {
            date.setDate(date.getDate() - 7 - day)
          } else {
            date.setDate(date.getDate() + 7 - day)
          }
        }

        let {days} = this
        let daysData = this.getDate()
        this.updateDateField()
        data.forEach((d, i) => {
          let weekDays = daysData[i]
          this.$set(days, d.item, weekDays)
          if (i === 1) {
            calendarHandle(weekDays)
          }
        })

        this.positionData = data
      }
    }
  }
</script>
<style scoped>
  .calendar {
    background-color: #65a9d8;
    color: #fff;
    border-radius: 10px;
    font-size: 12px;
    a{
      color: #fff;
    }
  }

  .c-head {
    text-align: center;
    padding: 14px 0 16px;
    position: relative;
    font-size: 14px;
    .sel {
      font-weight: bold;
    }
    .down-arrow {
      padding-left: 6px;
    }
    .c-today {
      position: absolute;
      right: 10px;
      top: 12px;
      background-color: #fff;
      color: #65a9d8;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      line-height: 1.6;
      &.grey {
        opacity: 0.4;
      }
    }
  }

  .sel-list{

    .s-year{
      position: relative;
      text-align: center;
      .y{
        font-size: 20px;

      }

      a{
        position: absolute;
        right: 18px;
        top: -4px;
        width: 30px;
        height: 30px;
        line-height: 1;
        font-size: 28px;
      }
      .la{
        left: 18px;

      }
      .ra{
      }
    }
    .month-box{
      background: #fafafa;
      border-radius: 6px;
      overflow: hidden;
      margin: 12px 10px;
    }
    .mon{
      color: #12b7f5;
      width: 25%;
      height: 40px;
      float: left;
      line-height: 40px;
      text-align: center;
      &:active,&.selected{
        background-color: #ddd;
      }
    }
  }

  .week {
    display: flex;
    text-align: center;
    .wk {
      flex: 1;
    }
    .hday {
      color: #d8cf74;
    }
  }

  .days {
    display: flex;
    text-align: center;
    .day {
      flex: 1;
      padding-top: 6px;
      span{
        display: block;
        width: 32px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 50px;
        line-height: 2.6;
        border: 1px solid transparent;
        margin: 0 auto;
      }
      &.has:after{
        content: '';
        display: block;
        width: 5px;
        height: 5px;
        background-color: #fff;
        margin: 4px auto 0;
        border-radius: 50%;

      }
    }
    .selected {
      span{
        border: 1px solid #fff;
      }

    }
    .tdy{
      span{
        background-color: #fff;
        color: #83bfe1;
      }

    }
    .grey {
      opacity: 0.4;
    }

  }

  .slide-loader {
    height:60px;
    .sl-move {
      height: 100%;
    }
  }
</style>
