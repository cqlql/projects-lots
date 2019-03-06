<template>
  <div>
    <p>1</p>
    <p>2</p>
    <div class="zoom" ref="eZoom">昨日晚上毕业生小曾发来短信，说她在学校获得了“态度端正工作认真”星级教师称号，想要我帮助写100字的个人教育格言上交学校，由学校做个海报明天贴出来，激励师生员工干事创业，开创学校教育教学的新局面。我想，恰好，明天上午有空，就答应试试、写一写。昨日晚上毕业生小曾发来短信，说她在学校获得了“态度端正工作认真”星级教师称号，想要我帮助写100字的个人教育格言上交学校，由学校做个海报明天贴出来，激励师生员工干事创业，开创学校教育教学的新局面。我想，恰好，明天上午有空，就答应试试、写一写。昨日晚上毕业生小曾发来短信，说她在学校获得了“态度端正工作认真”星级教师称号，想要我帮助写100字的个人教育格言上交学校，由学校做个海报明天贴出来，激励师生员工干事创业，开创学校教育教学的新局面。我想，恰好，明天上午有空，就答应试试、写一写。</div>
  </div>
</template>

<script>
import ZoomTouch from './zoom-touch.js'
export default {
  mounted () {
    new ZoomTouch(this.$refs.eZoom)
  }
}
</script>

<style>
.zoom {
  background-color: #eee;
  margin-left: 100px;
  margin-top: 100px;
  /* height: 1000px; */
}
</style>
