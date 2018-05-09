<template>
<div class="leave-det">
  <div class="head">
    <div class="sum">
      <div class="num">
        <span class="n">5次</span>
        <span class="t">请假</span>
      </div>
      <div class="name">李大坤</div>
    </div>
    <ul>
      <li>事假：<span>1次</span></li>
      <li>事假：<span>1次</span></li>
      <li>事假：<span>1次</span></li>
    </ul>

  </div>
  <div class="axis-list">
    <div class="list">
      <div class="item">
        <div class="tit">2017/11/15  9:00~2017/11/16  9:00</div>
        <div class="det">病假：1天 </div>
        <div class="det">原因：因得严重性感冒，无法正常学习固请假一天  回家休息治疗</div>
        <div class="det">回家休息 </div>
        <i class="arrow"></i>
        <i class="origin"></i>
      </div>
      <div class="item none">
        <i class="origin"></i>
      </div>
      <p class="cf"></p>
    </div>
  </div>
</div>
</template>

<script>
    export default {}
</script>

<style scoped>
  .leave-det{
    .head{
      background-color: #0a77af;
      color: #fff;
      padding: 26px 0 16px;
      .sum{
        border: 1px solid #a5d6ef;
        border-radius: 50%;
        height: 123px;
        width: 123px;
        margin: 0 auto;
        text-align: center;
      }
      .num{
        margin-top: 36px;

      }
      .n{
        color: #f60;
        font-size: 30px;
      }
      .t{

      }
      .name{
        margin-top: 6px;
      }

      ul{
        display: flex;
        padding-top: 26px;
      }
      li{
        flex: 1;
        text-align: center;
        span{
          color: #f60;
        }
      }
    }
  }

  .axis-list{
    .list {
      border-left: 1px solid #b8b8b8;
      margin-top: 34px;
      margin-left: 16px;
    }
    .item {
      background-color: #e3e3e3;
      border-radius: 6px;
      padding: 10px;
      margin-left: 32px;

      margin-right: 15px;
      position: relative;
      float: left;
      clear: both;
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
      .tit {
        color: #666;
        font-size: 16px;
        padding-bottom: 6px;
      }
      .det {
        color: #999;
        line-height: 1.4;
        padding: 4px 0;
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
