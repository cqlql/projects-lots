<template>
  <div class="calendar">
    <table>
      <thead>
      <tr class="week">
        <td class="wk" v-for="v in week">{{v}}</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td v-for="d in days" class="day">{{d.date}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Datetime from '../src/modules/datetime'
  let datetime = new Datetime()
  export default {
    data () {
      return {
        week: ['一', '二', '三', '四', '五', '六', '日'],
        days: []
      }
    },
    methods: {

    },
    created () {
      console.log(this.days)
      this.days = datetime.getWeekDate('2017/11/2')
    }
  }
</script>
<style scoped>
  table{
    width: 100%;
  }
  .calendar{
  }
  .week {

    .wk{
    }
  }
</style>
