<template>
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
</template>

<script>
  export default {}
</script>

<style>
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
</style>
