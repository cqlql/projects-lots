<template>
  <div id="app">
    <div class="app-bg"></div>

    <div class="main">
      <transition :name="transitionName">
        <router-view :bus="bus"></router-view>
      </transition>
    </div>
    <div class="copyright">
      <div>版权:深圳市南山区第二外国语学校（集团）海德学校<p>设计: 刘志勇</p></div>
    </div>
  </div>
</template>

<script>
  let pagesLevel = {
    Home: 0,
    Practice: 1,
    Challenge: 1,
    ChallengeSimple: 1
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
  .app-bg{
    position: fixed;
    top: 0;
    right: 0;
    left:0;
    bottom: 0;
    background: linear-gradient(top,#09bddd,#a4f1ff);
  }
  .main{
    position: relative;
  }

  .copyright{
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    div{
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 10px 10px;
      border-radius: 100px;
      color: #6c6a6a;
    }
  }

</style>
