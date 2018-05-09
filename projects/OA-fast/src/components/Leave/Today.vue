<template>
  <div class="today">
    <div class="item" v-for="item in list">
      <router-link :to="{name:'LeaveDet'}">
        <div class="tit">
          <b>{{item.name}}</b> <span>(三年级1班)</span>
          <a class="ratify">批准</a>
          <a class="voice">&#xe680;</a>
        </div>
        <div class="oth">请假天数：{{item.leaveDay}}天</div>
        <div class="oth">请假类型：{{item.leaveType}}</div>
        <div class="oth">请假时间：{{item.leaveStartTime}}~{{item.leaveEndTime}}</div>
      </router-link>
    </div>
    <!--<div class="item">
      <div class="tit">
        <b>李世明</b> <span>(三年级1班)</span>
        <a class="ratify">批准</a>
        <a class="voice">&#xe680;</a>

      </div>
      <div class="oth">请假天数：1天</div>
      <div class="oth">请假类型：病假</div>
      <div class="oth">请假时间：2017/11/15 <span>9:00</span>~2017/11/16 <span>9:00</span></div>
    </div>-->
    <!--<BottomBar></BottomBar>-->
  </div>
</template>

<script>
  // import BottomBar from '@/components/Modules/BottomBar.vue'

  export default {
    data () {
      return {
        list: [{
          name: '王攸宁',
          grade: '(三年级1班)',
          leaveDay: 2,
          leaveType: '病假',
          leaveStartTime: '2017/11/15 9:00',
          leaveEndTime: '2017/11/16 9:00'
        }, {
          name: '陈毅',
          grade: '(三年级1班)',
          leaveDay: 2,
          leaveType: '事假',
          leaveStartTime: '2017/11/15 9:00',
          leaveEndTime: '2017/11/16 9:00'
        }]
      }
    },
    components: {
      // BottomBar
    }
  }
</script>

<style scoped>
  .today {
    padding-bottom: 50px;
    .item {
      background-color: #fff;
      border-radius: 10px;
      margin: 15px 10px;

      box-shadow: 0px 1px 15px 0px #bfbfbf;
      &>a{
        display: block;
        padding: 15px;
      }
      .tit {
        font-size: 16px;
        b {
          color: #666;

        }
        span {
          color: #999;
        }
      }
      .voice {
        color: #18a6ee;
        float: right;
        font-family: 'iconfont';
        width: 18px;
        height: 18px;
        border: 1px solid #18a6ee;
        border-radius: 100px;
        margin-right: 10px;
        padding: 2px;
        margin-top: -2px;
      }
      .ratify {
        color: #18a6ee;
        border: 1px solid #18a6ee;
        border-radius: 100px;
        font-size: 14px;
        padding: 3px 18px 2px;
        margin-top: -2px;

        float: right;
      }
      .oth {
        color: #999;
        padding: 10px 0 0;
      }
    }
  }
</style>
