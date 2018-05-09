<template>
    <!--<transition :name="'size'"
                :enter-active-class="'size-active'"
                :leave-active-class="'size-active'">-->
  <div v-show="show" class="count">
    <ol ref="eMove">
      <li></li>
      <li v-for="(v,i) in 10">{{mode===1?i:(i%2?'-':'+')}}</li>
      <li></li>
    </ol>
  </div>
  <!--</transition>-->
</template>

<script>
  import NumSwitch from './num-switch'
  import autoprefix from '../corejs/dom/css/autoprefix'

  let transform = autoprefix('transform')[0]

  export default {
    props: ['num', 'mode'],
    data () {
      return {
        show: 1
      }
    },
    mounted () {
      let eMove = this.$refs.eMove
      let {style} = eMove
      this.numSwitch = new NumSwitch()
      this.numSwitch.move = function (y) {
        style[transform] = `translateY(-${y}px)`
        // style[transform] = `translate3d(0,-${y}px,0)`
      }
    },
    methods: {
      start (cb) {
        let {num} = this
        num *= 1
        this.show = 1
        this.numSwitch.start(num, () => {
          cb()
        })
      },
      reset () {
        this.numSwitch.move(0)
        this.show = 1
      },
      clear () {
        this.show = this.num > -1
      }
    }
  }
</script>

<style scoped>
  .size-active{
    transition: 0.3s cubic-bezier(.55,0,.1,1);
    transition-property:width,opacity,transform;
  }
  .size-enter, .size-leave-to {
    width:0!important;
    opacity: 0;
    transform: scale(0.8, 0.8);
  }

</style>

<!--<style module>
  .numBox {
    display: inline-block;
    width: 90px;
    height: 170px;
    background-color: #b43a37;
    border-radius: 15px;
    box-shadow: 2px 2px 0 0 #333;
    color: #ffff00;
    font-size: 100px;
    text-align: center;
    font-weight: 600;
    line-height: 170px;
    overflow: hidden;
  }
  .move {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .item{
    width: 90px;
    height: 170px;
    font-size: 50px;
    line-height: 1;
    text-align: center;
  }
</style>-->
