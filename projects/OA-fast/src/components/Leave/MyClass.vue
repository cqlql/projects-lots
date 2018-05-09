<template>
  <div class="my-class">
    <a class="head-menu" @click="open">&#xe62a;</a>
    <div class="head">
      <div class="top-tit">2017年11月统计</div>
      <div class="bar">
        <div class="b">
          <div class="bb">
            <div style="height: 60px"></div>
          </div>
          <div class="txt">事假：67次</div>
        </div>
        <div class="b">
          <div class="bb">
            <div style="height: 30px"></div>
          </div>
          <div class="txt">事假：67次</div>
        </div>
        <div class="b">
          <div class="bb">
            <div style="height: 10px"></div>
          </div>
          <div class="txt">事假：67次</div>
        </div>
      </div>
    </div>
    <div class="axis-list">
      <div class="list">
        <div class="item">
          <div class="tit">有五人请假</div>
          <div class="det"> 请假人：张飞（病）,李四（事）,王五（事），黄  六（病）,陈老七（丧假） </div>
          <i class="arrow"></i>
          <i class="origin"></i>
          <div class="time"><span>30号</span></div>
        </div>
        <div class="item">
          <div class="tit">有五人请假</div>
          <div class="det"> 请假人：张飞（病）,李四（事）,王五（事），黄  六（病）,陈老七（丧假） </div>
          <i class="arrow"></i>
          <i class="origin"></i>
          <div class="time"><span>29号</span></div>
        </div>
        <div class="item">
          <div class="tit">有五人请假</div>
          <div class="det"> 请假人：张飞（病）,李四（事）,王五（事），黄  六（病）,陈老七（丧假） </div>
          <i class="arrow"></i>
          <i class="origin"></i>
          <div class="time"><span>28号</span></div>
        </div>
        <div class="item">
          <div class="tit">有五人请假</div>
          <div class="det"> 请假人：张飞（病）,李四（事）,王五（事），黄  六（病）,陈老七（丧假） </div>
          <i class="arrow"></i>
          <i class="origin"></i>
          <div class="time"><span>27号</span></div>
        </div>
        <div class="item none">
          <i class="origin"></i>
        </div>
        <p class="cf"></p>
      </div>
    </div>
    <TopListSelect v-if="selectShow" @close="close"></TopListSelect>
  </div>
</template>

<script>
  import TopListSelect from '@/components/Modules/TopListSelect/index.vue'
  export default {
    data () {
      return {
        selectShow: 0
      }
    },
    components: {
      TopListSelect
    },
    methods: {
      close () {
        this.selectShow = 0
      },
      open () {
        this.selectShow = !this.selectShow
      }
    }
  }
</script>

<style>
  .my-class {
    .head-menu{
      position: absolute;
      top: 1px;
      right: 10px;
      font-family: 'iconfont';
      color: #fff;
      font-size: 28px;
    }

    .top-tit {
      text-align: center;
      padding-top: 10px;
    }
    .head{
      background-color: #0a77af;
      color: #fff;
    }
    .bar {
      display: flex;
      .bb{
        width: 32px;
        height: 80px;
        position: relative;
        margin: 0 auto;
        div{
          background-color: #fff;
          position: absolute;
          width: 32px;
          bottom: 0;
          border-radius: 6px 6px 0 0;
        }
      }
      .txt{
        text-align: center;
        padding: 8px 0 20px;
      }
      .b {
        flex: 1
      }
    }

    .axis-list{
      .list {
        border-left: 1px solid #b8b8b8;
        margin-left: 38px;
        margin-top: 34px;
      }
      .item {
        background-color: #e3e3e3;
        border-radius: 6px;
        padding: 10px;
        margin-left: 32px;

        margin-right: 15px;
        position: relative;
        float: left;
        margin-top: 20px;

        &:first-child{
          margin-top: -15px;
          float: left;
        }

        .arrow {
          position: absolute;
          top: 12px;
          left: -38px;
          width: 0;
          height: 0;
          border: 20px solid #e3e3e3;
          border-left-color: transparent;
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-top-width: 8px;
          border-bottom-width: 8px;
        }
        .origin {
          position: absolute;
          top: 14px;
          left: -38px;
          width: 12px;
          height: 12px;
          background-color: #b8b8b8;
          border-radius: 50%;
        }
        .time {
          position: absolute;
          top: 13px;
          left: -40px;
          text-align: right;
          width: 0;
          span {
            float: right;
            width: 100px;
            color: #b8b8b8;
            font-size: 12px;
          }
        }
        .tit {
          color: #666;
          font-size: 16px;
          padding-bottom: 6px;
        }
        .det {
          color: #999;
          line-height: 1.6;
        }
        &.none{
          background-color: transparent;
          .origin {
            position: absolute;
            top: 12px;
            left: -37px;
            width: 8px;
            height: 8px;
            background-color: #b8b8b8;
            border-radius: 50%;
          }
        }
      }
    }
  }


</style>
