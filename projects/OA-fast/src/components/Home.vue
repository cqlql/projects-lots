<template>
  <div class="home">
    <div class="banner">
      <img src="../assets/imgs/home/banner.png">
    </div>
    <div class="cont">
      <ul>
        <li class="li-b1">
          <a href="#">
            <div>
              <div><img src="../assets/imgs/home//cj.png"></div>
              <div>成绩</div>
            </div>

          </a>
        </li>
        <li class="li-b2">
          <router-link :to="{name:'Check'}">
            <div>
              <div><img src="../assets/imgs/home/jxkq.png"></div>
              <div>进校考勤</div>
            </div>
          </router-link>
        </li>
        <li class="li-b1">
          <router-link :to="{name:'Today'}">
            <div>
              <div><img src="../assets/imgs/home/pj.png"></div>
              <div>批假</div>
            </div>

          </router-link>
        </li>
        <li class="li-b2">
          <a href="#">
            <div>
              <div><img src="../assets/imgs/home/xwbx.png"></div>
              <div>行为表现</div>
            </div>

          </a>
        </li>
        <li class="li-b3">
          <router-link :to="{name:'Literacy'}">
            <div>
              <div><img src="../assets/imgs/home/szpj.png"></div>
              <div>素质评价</div>
            </div>

          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  a {
    color: #777;
  }

  a:hover {
    color: #ccc
  }

  img {
    border: 0px;
  }

  .banner {
    margin: 0 auto;
    padding-top: 53.8%;
    position: relative;
  }

  .banner img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .cont {
    overflow: hidden;
    background-color: #fff;
  }

  /*.li-b1 {
    border-right: 1px solid #f7f6f6;
    border-bottom: 1px solid #f7f6f6;
  }

  .li-b2 {
    border-bottom: 1px solid #f7f6f6;
  }

  .li-b3 {
    border-right: 1px solid #f7f6f6;
  }*/

  .cont li {
    float: left;
    width: 50%;
    border-bottom: 1px solid #f7f6f6;
    box-sizing: border-box;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;

    &:nth-child(2n+1){
      border-right: 1px solid #f7f6f6;
    }
  }

  .cont a img {
    max-width: 50px;
    width: 100%;
    padding-top: 10px
  }

</style>
