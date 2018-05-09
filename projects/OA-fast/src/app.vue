<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view :bus="bus">></router-view>
    </transition>
    <!--<bottom-nav-bar :bus="bus"></bottom-nav-bar>-->
  </div>
</template>

<script>
  //  import BottomNavBar from './components/modules/bottom-nav-bar.vue'

  let pagesLevel = {
    Login: 4,
    Home: 0,
    Products: 1,
    User: 2,
    Message: 3
  }
  export default {
    props: ['bus'],
    data () {
      return {
        transitionName: ''
      }
    },
    watch: {
      '$route' (to, from) {
        let toPath = to.path
        let fromPath = from.path
        toPath = toPath.trim().replace(/\/$/, '').replace(/\/+/, '/')
        fromPath = fromPath.trim().replace(/\/$/, '').replace(/\/+/, '/')
        if (from.name) {
          this.transition = true
          let toDepth = toPath.split('/').length
          let fromDepth = fromPath.split('/').length
          if (toDepth === fromDepth) {
            toDepth = pagesLevel[to.name]
            fromDepth = pagesLevel[from.name]
          }
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
    },
    components: {
      // BottomNavBar
    }
  }
</script>

<style scoped>
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
    background-color: #f3f3f4;
    height: 100%;
  }
  .slide-right-leave-active,
  .slide-left-enter-active {
    z-index: 2;
  }
  .slide-left-enter,
  .slide-right-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-to,
  .slide-right-enter {
    transform: translate3d(-30px, 0, 0);
    /*z-index: 1;*/
  }

  /*.slide-right-leave-active,
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
  }*/
</style>
