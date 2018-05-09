<template>
<div class="time">
  <h2>测试是否与系统时间同步</h2>
  <p>1秒更新，跟系统时间变更几乎没有偏差：<span style="color:red">{{hour}}:{{minute}}:{{second}}</span></p>
  <p>10秒更新，完全在系统时间秒数到达00、10更新：<span style="color:red">{{hour2}}:{{minute2}}:{{second2}}</span></p>
</div>
</template>

<script>
import TimeUpdate from '@/modules/corejs/time/time-update.js'
let timeUpdate = new TimeUpdate()
let timeUpdate2 = new TimeUpdate()
function numfill (number) {
  if (number < 10) {
    return '0' + number
  }
  return number
}
export default {
  data () {
    return {
      hour: '00',
      minute: '00',
      second: '00',
      hour2: '00',
      minute2: '00',
      second2: '00'
    }
  },
  created () {
    timeUpdate.start(() => {
      let d = new Date()
      this.hour = numfill(d.getHours())
      this.minute = numfill(d.getMinutes())
      this.second = numfill(d.getSeconds())
    }, 1000)
    timeUpdate2.start(() => {
      let d = new Date()
      this.hour2 = numfill(d.getHours())
      this.minute2 = numfill(d.getMinutes())
      this.second2 = numfill(d.getSeconds())
    }, 1000 * 10)
  },
  destroyed () {
    timeUpdate.stop()
    timeUpdate2.stop()
  }
}
</script>

