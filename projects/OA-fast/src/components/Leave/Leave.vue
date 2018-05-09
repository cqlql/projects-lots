<template>
  <div class="leave">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <div class="bottom-bar">
      <router-link :to="{name:'Today'}" class="item" :class="{active:selectState}">
        <p class="i"><i>&#xe615;</i></p>
        <p class="txt">今日</p>
      </router-link>
      <router-link :to="{name:'Statistics'}" class="item" :class="{active:!selectState}">
        <p class="i"><i>&#xe71d;</i></p>
        <p class="txt">统计</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  //  import BottomBar from '@/components/Modules/BottomBar.vue'
  export default {
    data () {
      return {
        selectState: 0,
        transitionName: 'slide-right'
      }
    },
    mounted () {
      // this.select(this.$route)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.select(to)
      })
    },
    beforeRouteUpdate (to, from, next) {
      this.select(to)
      next()
    },
    methods: {
      select (route) {
        this.transitionName = (this.selectState = route.name === 'Today') ? 'slide-right' : 'slide-left'
      }
    },
    components: {
      //      BottomBar
    }
  }
</script>

<style>
  .leave {
    .slide-right-leave-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-left-enter-active{
      transition: 0.3s cubic-bezier(.55,0,.1,1);
      transition-property:opacity,transform;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

    }
    .slide-left-enter, .slide-right-leave-to {
      opacity: 0;
      transform: translate3d(30px, 0, 0);
    }
    .slide-left-leave-to, .slide-right-enter {
      opacity: 0;
      transform: translate3d(-30px, 0, 0);
    }
  }

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
