<template>
<div class="bottom-bar">
    <router-link :to="{name:'Today'}" class="item" :class="{active:selectedIndex === 0}">
      <p class="i"><i>&#xe615;</i></p>
      <p class="txt">今日</p>
    </router-link>
    <router-link :to="{name:'Statistics'}" class="item" :class="{active:selectedIndex === 1}">
      <p class="i"><i>&#xe71d;</i></p>
      <p class="txt">统计</p>
    </router-link>
</div>
</template>

<script>
  export default {
    data () {
      return {
        selectedIndex: 0
      }
    }
  }
</script>

<style>
  .bottom-bar{
    height: 50px;
    position: fixed;
    bottom:0;
    border-top:1px solid #ddd;
    background-color: #fff;
    width: 100%;
    display: flex;

    .item{
      flex: 1;
      text-align: center;
      color: #aaa;
      .i{
        font-size: 22px;
        padding-top:2px;

      }
      i{
        font-family: 'iconfont';
        font-style: normal;

      }
      &.active{
        color: #0a77af;
      }
    }
  }

</style>
