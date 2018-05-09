<template>
  <div>

    <div class="manage">
      <div class="title">
        <div class="class-name">
          <div class="f-c1"></div>
          <div class="c1-r">三年级2班</div>
          <div class="f-c2"></div>
          <div class="c1-r">三年级5班</div>
        </div>
        <div class="date-m">2017年11月</div>
      </div>
      <div class="chart-list">
        <div class="c-l1"></div>
        <div class="c-l2"></div>
        <div class="c-l3"></div>
        <div class="c-l4"></div>
        <div class="c-l5"></div>
        <div class="c-l6"></div>
      </div>
      <div class="L"></div>
      <div class="chart-list">
        <div class="chart-w">事假</div>
        <div class="chart-w">病假</div>
        <div class="chart-w">其它</div>

      </div>
    </div>
    <div class="manage">
      <div class="title2">
        <div>三年级2班</div>
      </div>
      <div class="chart-list">
        <div class="chart-j">事假:<span class="s-c">417次</span></div>
        <div class="chart-j">病假：<span>208次</span></div>
        <div class="chart-j">其它：<span>29次</span></div>

      </div>
      <div class="title2">
        <div>三年级5班</div>
      </div>
      <div class="chart-list">
        <div class="chart-j">事假:<span class="s-c">417次</span></div>
        <div class="chart-j">病假：<span>208次</span></div>
        <div class="chart-j">其它：<span>29次</span></div>

      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .manage {
    border-radius: 15px;
    margin: 10px;
    border: 1px solid #fff;
    background-color: #fff;
    display: block;
    box-shadow: 0px 1px 15px 0px #bfbfbf;
  }

  .title {
    width: 100%;
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 16px;
  }

  .class-name {
    color: #666;
    padding-left: 16px;
    font-weight: bold;
    display: inline;
  }

  .date-m {
    color: #999;
    float: right;
    padding-right: 15px;
    font-weight: bold
  }

  .f-c1 {
    background-color: #19a7ef;
    width: 8.5px;
    height: 8.5px;
    border-radius: 2px;
    float: left;
    margin-top:4px;
    margin-right: 6px;
  }

  .f-c2 {
    background-color: #39c980;
    width: 8.5px;
    height: 8.5px;
    border-radius: 2px;
    margin-top:4px;
    margin-right: 6px;
    float: left;
  }
  .c1-r{
    overflow: hidden;
  }

  .chart-list {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }

  .c-l1 {
    width: 10px;
    min-width: 10px;
    height: 128px;
    background-color: #19a7ef;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 45px;
    margin-left: 76px;
  }

  .c-l2 {
    width: 10px;
    min-width: 10px;
    height: 100px;
    background-color: #39c980;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 73px;
    margin-left: 6.5px;
  }

  .c-l3 {
    width: 10px;
    min-width: 10px;
    height: 90px;
    background-color: #19a7ef;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 83px;
    margin-left: 63px;
  }

  .c-l4 {
    width: 10px;
    min-width: 10px;
    height: 80px;
    background-color: #39c980;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 93px;
    margin-left: 6.5px;
  }

  .c-l5 {
    width: 10px;
    min-width: 10px;
    height: 60px;
    background-color: #19a7ef;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 113px;
    margin-left: 63px;
  }

  .c-l6 {
    width: 10px;
    min-width: 10px;
    height: 50px;
    background-color: #39c980;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 123px;
    margin-left: 6.5px;
  }

  .L {
    margin: 6px 30px 4.5px 30px;
    color: #ddd;
    border-bottom: 1px solid #ddd;
  }

  .chart-w {
    color: #999;
    font-size: 12px;
    margin-left: 72px;
    font-weight: bold;
    margin-bottom: 17.5px
  }

  .title2 {
    width: 100%;
    padding-top: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #666;
    padding-left: 16px;
  }

  .chart-j {
    font-size: 12px;
    font-weight: bold;
    margin-left: 10%;
    text-align: center;
    margin-bottom: 40px;
    color: #999;
    margin-top: 20px;
  }

  .s-c {
    color: #c55d5d
  }
</style>
