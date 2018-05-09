<template>
  <div id="app">
    <button ref="load">loader</button>
    <button ref="pop">弹出</button>
    <button ref="popSingle">单实例</button>
    <button ref="msgSimple">简单消息</button>
    <button ref="debugmsg">部分设备简单debug弹层</button>
    <div ref="info"></div>
  </div>
</template>

<script>
  import Popup from '@/modules/popup/popup'
  import debug from '@/modules/popup/debug-msg'
  export default {
    data () {
      return {
        bottomOptionsShow: 1
      }
    },
    components: {},
    mounted () {
      let {$refs} = this

      // demo1
      let newPopup = new Popup({
        title: 'test标题',
        content: '<p style="padding:10px">基础弹窗，多实例，可复用基础弹窗</p>',
        keepLive: true,
        created () {
          console.log('窗口元素被添加')
        }
      })
      $refs.pop.addEventListener('click', function () {
        newPopup.show()
      })

      // demo2，已集成vue实例中，可直接this调用
      $refs.popSingle.addEventListener('click', e => {
        this.$popup({
          content: '<p style="padding:10px">单实例</p>'
        })
      })

      // demo3，已集成vue实例中，可直接this调用
      $refs.msgSimple.addEventListener('click', e => {
        this.$simpleMsg('消息')
      })

      $refs.debugmsg.addEventListener('click', e => {
        debug('debug消息')
      })
      $refs.load.addEventListener('click', e => {
        this.$preloaderFull.show()
        setTimeout(() => {
          this.$preloaderFull.close()
        }, 600)
      })
    }
  }
</script>

<style scoped>
  p {
    text-align: center;
    font-size: 20px;
    padding: 10px;
  }
</style>
