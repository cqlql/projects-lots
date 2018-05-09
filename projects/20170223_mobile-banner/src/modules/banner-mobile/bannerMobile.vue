<template>
  <div class="banner">
    <ul class="move">
      <li>
        <img src="./test-imgs/1.png" height="300" width="800"/>
      </li>
      <li><img src="./test-imgs/2.png" height="300" width="800"/></li>
      <li><img src="./test-imgs/3.png" height="300" width="800"/></li>
      <li><img src="./test-imgs/4.png" height="300" width="800"/></li>
      <li><img src="./test-imgs/5.png" height="300" width="800"/></li>
    </ul>
    <ul class="btn"></ul>
  </div>
</template>

<script>
  import Banner from './banner-mobile'
  let banner = new Banner()
  export default {
    name: 'banner-mobile',
    created () {
    },
    mounted () {
      banner.init({
        eBox: this.$el
      })
    },
    destroyed () {
      banner.destroy()
    }
  }
</script>

<style>
  .banner {
    height: 140px;
    background-color: #000;
    overflow: hidden;
    position: relative;
    .move {
      margin: 0;
      padding: 0;
      position: relative;
      width: 100%;
      height: 100%;
    }
    .move li {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-align: center;

      img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
    }
    .btn {
      margin: 0;
      padding: 0;
      line-height: 0;
      position: absolute;
      bottom: 6px;
      width: 100%;
      height: 10px;
      text-align: center;
    }
    .btn li {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 0 4px;
      background-color: #fff;

    }
    .btn li.active {
      background-color: #0077c6;
    }
    .animated {
      transition:transform 0.3s ease;
    }

  }

</style>
