<template>
<div class="head">
  <h1><div class="img"><img src="../assets/imgs/logo.png" /></div>圆周率记忆挑战</h1>
  <div class="cloud-img"></div>
</div>
</template>

<script>
    export default {}
</script>

<style scoped>
  .cloud-img{
    width: 375px;
    height: 175px;

    background: url('../assets/imgs/4.png') no-repeat;
    background-size: 100% auto;
    margin: -8px auto 0;

  }
  h1{
    font-size: 18px;
    color: #fff;
    text-align: center;
    text-shadow: 0px 1px 2px #848484;

    position: relative;
    width: 200px;
    margin: 22px auto 0;
    z-index: 1;
    .img{
      width: 50px;
      height: 50px;
      position: absolute;
      left: -26px;
      top: -13px;
      box-shadow: 0 1px 5px #000;
      border-radius: 50%;
      img{
        width: 100%;
      }
    }
  }
</style>
