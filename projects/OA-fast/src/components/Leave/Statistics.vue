<template>
  <div class="statistics">

    <div class="school-count">
      <div class="title">
        <div class="school-name">杨美中学</div>
        <div class="date">2017年11月</div>
      </div>
      <div class="chart">
        <div class="chart-list c-h1"></div>
        <div class="chart-list c-h2"></div>
        <div class="chart-list c-h3"></div>
      </div>
      <div class="L"></div>
      <div class="chart">
        <div class="chart-w">事假：367次</div>
        <div class="chart-w">病假：298次</div>
        <div class="chart-w">其它：37次</div>
      </div>
    </div>
    <div class="school-count">
      <router-link :to="{name:'MyClass'}">
        <div class="title">
          <div class="school-name">我的班级</div>
          <div class="date"><a href="#"> &gt; </a></div>
        </div>
        <div class="chart">
          <div class="chart-list c-h1"></div>
          <div class="chart-list c-h2"></div>
          <div class="chart-list c-h3"></div>
        </div>
        <div class="L"></div>
        <div class="chart">
          <div class="chart-w">事假：367次</div>
          <div class="chart-w">病假：298次</div>
          <div class="chart-w">其它：37次</div>
        </div>
      </router-link>

    </div>
    <div class="school-count">
      <router-link :to="{name:'Compare'}">
        <div class="title">
          <div class="school-name bot">请假查询</div>
          <div class="date"><a href="#"> &gt; </a></div>
        </div>
      </router-link>

    </div>
  </div>

</template>

<script>
  export default {}
</script>

<style scoped>
  .school-count {
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

  .school-name {
    color: #666;
    padding-left: 16px;
    font-weight: bold
  }

  .date {
    color: #999;
    float: right;
    padding-right: 15px;
    font-weight: bold
  }

  .chart {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }

  .chart-list {
    width: 30px;
    background-color: #19a7ef;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .c-h1 {
    height: 52px;
    margin-left: 50px;
    margin-top: 25px;
  }

  .c-h2 {
    height: 30px;
    margin-left: 87px;
    margin-top: 47px;
  }

  .c-h3 {
    height: 10px;
    margin-left: 79.5px;
    margin-top: 67px;
  }

  .L {
    margin: 6px 30px 4.5px 30px;
    color: #ddd;
    border-bottom: 1px solid #ddd;
  }

  .chart-w {
    color: #999;
    font-size: 12px;
    margin-left: 43px;
    font-weight: bold;
    margin-bottom: 17.5px
  }

  .bot {
    margin-bottom: 20px;
  }
</style>
